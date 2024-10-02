import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenExpiration = process.env.JWT_ACCESS_TOKEN_EXPIRATION;
const refreshTokenExpiration = process.env.JWT_REFRESH_TOKEN_EXPIRATION;

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiration,
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiration,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};
