import 'dotenv/config';
import config from './utils/config.js';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import appointmentRoutes from './routes/appointment.js';
import handleError from './middleware/handleError.js';

const app = express();

// enable json body parser middleware
app.use(express.json());

// enable CORS middleware that will allow cross-origin resource sharing
app.use(cors());

// applying routes related to user authentication and authorization
app.use('/user', userRoutes);

// applying routes related to appointments
app.use('/appointment', appointmentRoutes);

// applying the error-handler middleware
app.use(handleError);

// listen for requests on the specified port
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}...`);
});
