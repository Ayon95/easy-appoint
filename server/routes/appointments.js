import express from 'express';
import { addAppointment, getAppointments } from '../controllers/appointments.js';
import authorizeUser from './../middleware/authorizeUser.js';

const router = new express.Router();

// route handler for GET request to get appointments
router.get('/', authorizeUser, getAppointments);

// route handler for POST request to add an appointment
router.post('/', authorizeUser, addAppointment);

export default router;
