import { Router } from 'express';
import { registerUser, verifyUser, logout, refresh, login, profile } from '../controllers/authController.js';

const router = Router();

router.post('/verify-email', verifyUser);

router.post('/register', registerUser);

router.post('/login', login)

router.post('/logout', logout)

router.post('/refresh', refresh)

export default router;