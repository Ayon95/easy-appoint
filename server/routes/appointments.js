import express from 'express';
import { addAppointment } from '../controllers/appointments.js';

const router = new express.Router();

// route handler for POST request to add an appointment
router.post('/', addAppointment);

export default router;
