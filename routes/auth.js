import express from 'express';
import { signIn, logIn, isLoggedIn, logout } from '../controller/auth.js';
const router = express.Router();
router.post('/login', logIn);
router.post('/signin', signIn);
router.post('/isLoggedIn', isLoggedIn);
router.post('/logout', logout);

export default router;
