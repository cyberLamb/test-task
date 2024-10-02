import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  cityVillage: { type: String, required: true },
  school: { type: String, required: true },
  subjects: { type: [String], required: true },
  grades: { type: [String], required: true },
  region: { type: String, required: true },
  refreshToken: { type: String, default: null },
},  { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;
