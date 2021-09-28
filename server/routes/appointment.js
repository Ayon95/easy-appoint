import express from 'express';
import { addAppointment } from '../controllers/appointment.js';

const router = new express.Router();

// route handler for POST request to add an appointment
router.post('/', addAppointment);

export default router;
