import { NonexistentResourceError, UnauthorizedUserError } from '../utils/error.js';
import pool from '../utils/db.js';
import { toSnakeCase } from '../utils/helpers.js';

export async function getAppointments(request, response, next) {
	try {
		// check if the request was made by an authorized user
		const user = request.user;
		if (!user) {
			throw new UnauthorizedUserError();
		}
		// getting the query params
		const sortBy = request.query.sort_by ? toSnakeCase(request.query.sort_by) : 'date';
		const sortDirection = request.query.sort_direction
			? request.query.sort_direction.toUpperCase()
			: 'DESC';
		let page = Number.parseFloat(request.query.page);
		let rowsPerPage = Number.parseFloat(request.query.rows_per_page);

		// find the total number of appointments
		const [appointmentsCountResult] = await pool.query(
			'SELECT COUNT(appointment_id) AS count FROM appointment'
		);
		const totalAppointments = appointmentsCountResult[0].count;

		// if valid rowsPerPage is not provided, then set it to 25
		if (!rowsPerPage || rowsPerPage === 0) rowsPerPage = 25;
		// find the total number of pages
		const totalPages = Math.ceil(totalAppointments / rowsPerPage);
		// if a valid page number is not provided, then set it to 1
		if (!page || page < 1 || page > totalPages) page = 1;

		// calculate the start and end indexes (first page is 1)
		const startIndex = (page - 1) * rowsPerPage;
		const endIndex = page * rowsPerPage;

		// determine the sql ORDER BY columns
		const orderByColumns =
			sortBy === 'date'
				? `appointment.date ${sortDirection}, appointment.time ${sortDirection}`
				: `appointment.${sortBy} ${sortDirection}`;

		// get the appointments for the specified page
		const sqlGetAppointments = `
			SELECT
				appointment_id,
				full_name,
				age, 
				phone_number,
				DATE_FORMAT(date, '%a %b %e, %Y') AS date,
				TIME_FORMAT(time, '%l:%i %p') AS time
			FROM appointment
			WHERE fk__appointment__user_id = ${pool.escape(user.user_id)}
			ORDER BY ${pool.escape(orderByColumns).replace(/\'/g, '')}
			LIMIT ${pool.escape(startIndex)}, ${pool.escape(endIndex)}
		`;
		const [appointments] = await pool.query(sqlGetAppointments);
		response.json({ totalAppointments, appointments });
	} catch (error) {
		next(error);
	}
}

export async function getAppointmentsBySearch(request, response, next) {
	try {
		// check if the request was made by an authorized user
		const user = request.user;
		if (!user) {
			throw new UnauthorizedUserError();
		}
		// get the search_term query param
		const { search_term: searchTerm } = request.query;
		// if no search term is provided then respond with an empty array
		if (!searchTerm) response.json([]);
		// get the appointments based on the search term
		const sql = `
			SELECT
				appointment_id,
				full_name,
				age,
				phone_number,
				DATE_FORMAT(date, '%a %b %e, %Y') AS date,
				TIME_FORMAT(time, '%l:%i %p') AS time
			FROM appointment
			WHERE
				fk__appointment__user_id = ${pool.escape(user.user_id)} AND
				full_name LIKE ${pool.escape(`%${searchTerm}%`)}
			ORDER BY
				appointment.date DESC,
				appointment.time DESC
		`;
		const [appointments] = await pool.query(sql);
		response.json(appointments);
	} catch (error) {
		next(error);
	}
}

export async function addAppointment(request, response, next) {
	try {
		// check if the request was made by an authorized user
		const user = request.user;
		if (!user) {
			throw new UnauthorizedUserError();
		}

		const { body } = request;

		// create an entry for the appointment and insert it into the database
		const sql = `
            INSERT INTO appointment(
                full_name, 
                age, 
                phone_number, 
                date, 
                time, 
                fk__appointment__user_id
            )
            VALUES(
                ${pool.escape(body.fullName)},
                ${pool.escape(body.age)},
                ${pool.escape(body.phoneNumber)},
                ${pool.escape(body.date)},
                ${pool.escape(body.time)},
                ${pool.escape(body.userId)}
            )
        `;
		const [result] = await pool.query(sql);

		// send a success response if the database query was successful
		response.status(201).json({
			appointmentId: result.insertId,
			fullName: body.fullName,
			age: body.age,
			phoneNumber: body.phoneNumber,
			date: body.date,
			time: body.time,
			userId: body.userId,
		});
	} catch (error) {
		next(error);
	}
}

export async function updateAppointment(request, response, next) {
	try {
		const user = request.user;
		if (!user) {
			throw new UnauthorizedUserError();
		}
		// get the id of the target appointment from the url
		const { appointmentId } = request.params;
		const { body } = request;
		// define a query to update the target appointment
		const sqlUpdateAppointment = `
			UPDATE appointment
			SET
				full_name = ${pool.escape(body.fullName)},
				age = ${pool.escape(body.age)},
				phone_number = ${pool.escape(body.phoneNumber)},
				date = ${pool.escape(body.date)},
				time = ${pool.escape(body.time)}
			WHERE appointment_id = ${pool.escape(appointmentId)}
		`;
		await pool.query(sqlUpdateAppointment);
		// get the updated appointment
		const [result] = await pool.query(
			`SELECT * FROM appointment WHERE appointment_id = ${pool.escape(appointmentId)}`
		);
		const updatedAppointment = result[0];

		response.json({
			appointmentId: Number.parseFloat(appointmentId),
			fullName: updatedAppointment.full_name,
			age: updatedAppointment.age,
			phoneNumber: updatedAppointment.phone_number,
			date: updatedAppointment.date,
			time: updatedAppointment.time,
			userId: user.userId,
		});
	} catch (error) {
		next(error);
	}
}

export async function removeAppointment(request, response, next) {
	try {
		// check if the request was made by an authorized user
		const user = request.user;
		if (!user) {
			throw new UnauthorizedUserError();
		}
		// check if an appointment exists with the given id
		const { appointmentId } = request.params;
		const sqlGetAppointment = `
			SELECT * FROM appointment
			WHERE appointment_id = ${pool.escape(appointmentId)}
		`;
		const [result] = await pool.query(sqlGetAppointment);
		if (result.length === 0) {
			throw new NonexistentResourceError('No appointment with the given ID exists');
		}
		// delete the appointment from the database
		const sqlRemoveAppointment = `
			DELETE FROM appointment
			WHERE appointment_id = ${pool.escape(appointmentId)}
		`;
		await pool.query(sqlRemoveAppointment);
		response.status(204).json({});
	} catch (error) {
		next(error);
	}
}
