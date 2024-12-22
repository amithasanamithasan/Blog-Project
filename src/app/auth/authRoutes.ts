import { Router } from 'express';
import { loginUser, registerUser } from './authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export const authRoutes = router;
