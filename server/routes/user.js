import express from 'express';
import { signUp } from '../controllers/user.js';

// create a router
const router = express.Router();

// route handler for POST request to sign up (create a new user)
router.post('/signup', signUp);

export default router;
