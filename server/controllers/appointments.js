import { UnauthorizedUserError } from '../utils/error.js';
import pool from '../utils/db.js';

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
		await pool.query(sql);

		// send a success response if the database query was successful
		response.json({
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
