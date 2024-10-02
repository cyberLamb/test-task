import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import { profile } from './controllers/authController.js';


dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);

app.use('api/users/:id', profile)

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
