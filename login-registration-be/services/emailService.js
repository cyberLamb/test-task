import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmailVerification = async ( email, code) => {
  const verificationLink = `http://localhost:3000/verify`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Your verification code is <h1><b>${code}</b><h1/> <br/> Click the following link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};
