import 'dotenv/config';
import config from './utils/config.js';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

// create a MySQL connection
const db = mysql.createConnection({
	user: config.MYSQL_USER,
	host: config.MYSQL_HOST,
	password: config.MYSQL_PASSWORD,
	database: config.MYSQL_DATABASE,
});

// connect to the database
db.connect(function (error) {
	if (error) {
		console.error(`error connecting to the database: ${error.stack}`);
		return;
	}
	console.log(`connected to the database as id ${db.threadId}`);
});

// enable json body parser middleware
app.use(express.json());

// enable CORS middleware that will allow cross-origin resource sharing
app.use(cors());

app.get('/', (request, response) => {
	response.send('Hello from EasyAppoint server');
});

// listen for requests on the specified port
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}...`);
});
