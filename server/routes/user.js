import express from 'express';
import { logIn, signUp } from '../controllers/user.js';

// create a router
const router = express.Router();

// route handler for POST request to log in
router.post('/login', logIn);

// route handler for POST request to sign up (create a new user)
router.post('/signup', signUp);

export default router;
