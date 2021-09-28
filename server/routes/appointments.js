import express from 'express';
import { addAppointment } from '../controllers/appointments.js';
import authorizeUser from './../middleware/authorizeUser.js';

const router = new express.Router();

// route handler for POST request to add an appointment
router.post('/', authorizeUser, addAppointment);

export default router;
