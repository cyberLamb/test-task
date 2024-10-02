import { sendEmailVerification } from '../services/emailService.js';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/tokenService.js';


export const registerUser = async (req, res) => {
  const { name, email, password, phone, cityVillage, school, subjects, grades, region } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      cityVillage,
      school,
      subjects,
      grades,
      region,
      isVerified: false,
      verificationToken, 
    });

    await newUser.save();

    await sendEmailVerification(email, verificationToken);

    res.status(201).json({ message: 'User registered successfully. OTP sent to email.' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { verificationCode } = req.body;

  try {
    const user = await User.findOne({ verificationToken: verificationCode });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.verificationToken === verificationCode) {
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } else {
      res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'None',  maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: 'Login successful', id: user.id,  accessToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('refreshToken');

  res.status(200).json({ message: 'Logout successful' });
}
export const profile = async (req, res) => {
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}
export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user._id);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error during refresh:', error);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};
