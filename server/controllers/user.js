import bcrypt from 'bcrypt';
import config from '../utils/config.js';
import jwt from 'jsonwebtoken';
import pool from './../utils/db.js';
import { DuplicateUserError } from '../utils/error.js';

export async function signUp(request, response, next) {
	try {
		const { body } = request;
		// check if a user with the email or username already exists in the database
		const sqlDuplicateUser = `
			SELECT *
			FROM app_user
			WHERE username = ${pool.escape(body.username)} OR email = ${pool.escape(body.email)}
		`;
		// executing the query
		const [duplicateUsers] = await pool.query(sqlDuplicateUser);
		// send an error response if a user already exists
		if (duplicateUsers.length > 0) throw new DuplicateUserError();
		// generate a password hash
		const passwordHash = await bcrypt.hash(body.password, 12);
		// create the new user (add the user to the database)
		// depending on whether or not the user has provided organization, there can be two different sql statements
		const sqlCreateUser = body.organization
			? `
			INSERT INTO app_user(username, email, organization, passwordHash)
			VALUES (
				${pool.escape(body.username)},
				${pool.escape(body.email)},
				${pool.escape(body.organization)},
				${pool.escape(passwordHash)}
			)
		`
			: `
			INSERT INTO app_user(username, email, passwordHash)
			VALUES (
				${pool.escape(body.username)},
				${pool.escape(body.email)},
				${pool.escape(passwordHash)}
			)
		`;
		// executing the INSERT query
		const [result] = await pool.query(sqlCreateUser);

		// generate a signed token
		const payload = { username: body.username, userId: result.insertId };
		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '5h' });
		// send a success response
		response.status(201).json({ token, username: body.username, userId: result.insertId });
	} catch (error) {
		next(error);
	}
}
