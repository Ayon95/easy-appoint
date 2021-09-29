import express from 'express';
import { addAppointment, getAppointments, removeAppointment } from '../controllers/appointments.js';
import authorizeUser from './../middleware/authorizeUser.js';

const router = new express.Router();

// route for GET request to get appointments
router.get('/', authorizeUser, getAppointments);

// route for POST request to add an appointment
router.post('/', authorizeUser, addAppointment);

// route for DELETE request to remove an appointment
router.delete('/:appointmentId', authorizeUser, removeAppointment);

export default router;
