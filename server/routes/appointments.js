import express from 'express';
import {
	addAppointment,
	getAppointments,
	getAppointmentsBySearch,
	removeAppointment,
	updateAppointment,
} from '../controllers/appointments.js';
import authorizeUser from './../middleware/authorizeUser.js';

const router = new express.Router();

// route for GET request to get appointments
router.get('/', authorizeUser, getAppointments);

// route for GET request to get appointments by search term
router.get('/search', authorizeUser, getAppointmentsBySearch);

// route for POST request to add an appointment
router.post('/', authorizeUser, addAppointment);

// route for PUT request to update an appointment
router.put('/:appointmentId', authorizeUser, updateAppointment);

// route for DELETE request to remove an appointment
router.delete('/:appointmentId', authorizeUser, removeAppointment);

export default router;
