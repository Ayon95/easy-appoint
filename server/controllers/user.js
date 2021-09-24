import bcrypt from 'bcrypt';
import config from '../utils/config.js';
import jwt from 'jsonwebtoken';
import pool from './../utils/db.js';
import { DuplicateUserError, NonexistentResourceError, PasswordError } from '../utils/error.js';

export async function logIn(request, response, next) {
	try {
		const { body } = request;
		// find the corresponding user in the database
		const sql = `
			SELECT *
			FROM app_user
			WHERE username = ${pool.escape(body.username)}
		`;
		const [result] = await pool.query(sql);
		const user = result[0];
		// if no such user is found, then throw an error
		if (!user) {
			throw new NonexistentResourceError('No user exists with the given username');
		}
		// check if the user provided the correct password
		const passwordIsCorrect = await bcrypt.compare(body.password, user.passwordHash);
		if (!passwordIsCorrect) throw new PasswordError();
		// generating a digitally-signed token containing the specified payload and signed with the secret string
		// the token payload contains necessary user information that the server can later use to verify the user who made the request
		const payload = { userId: result.insertId };
		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '5h' });

		response.status(201).json({
			token,
			username: body.username,
			userId: result.insertId,
		});
	} catch (error) {
		next(error);
	}
}

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
		const payload = { userId: result.insertId };
		const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '5h' });
		// send a success response
		response.status(201).json({
			token,
			username: body.username,
			userId: result.insertId,
		});
	} catch (error) {
		next(error);
	}
}
