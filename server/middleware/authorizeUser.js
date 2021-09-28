/* This middleware will be responsible for checking whether or not
a request to a protected resource contains the token needed to authorize the user.
Only an authorized user can access protected resources.
The server will expect the request to have an Authorization header containing the token.
The Authorization header's value is expected to be in the following format:
Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW

Example:
- Suppose a user wants to create a post
- the user fills out a form and submits it
- the server needs to verify that the user has permission to perform that action
- this middleware will perform that check and will either authorize or deny the user
- the server will only process the request if the user is authorized

- submit form (send POST request) -> authorizeUser next() -> controller for creating new post
*/

import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import { AuthHeaderError, NonexistentResourceError } from '../utils/error.js';
import pool from '../utils/db.js';

async function authorizeUser(request, response, next) {
	try {
		// getting the value of the Authorization header
		const authHeaderValue = request.get('Authorization');
		// checking if the header value exists and if it is using the Bearer scheme
		// if there is no Authorization header value, then that means there's no token
		if (!authHeaderValue || !authHeaderValue.toLowerCase().startsWith('bearer')) {
			throw new AuthHeaderError();
		}
		// extract the token from the auth header value
		const token = authHeaderValue.split(' ')[1];

		// verifying our server-generated token and getting its decoded payload
		// if the token is missing or is invalid, then a JsonWebTokenError will be thrown
		// if the token is expired, then a TokenExpiredError will be thrown
		const decodedPayload = jwt.verify(token, config.JWT_SECRET);

		// find the corresponding user in the database
		const sql = `
			SELECT *
			FROM app_user
			WHERE user_id = ${pool.escape(decodedPayload.userId)}
		`;
		const [result] = await pool.query(sql);
		const user = result[0];

		if (!user) {
			throw new NonexistentResourceError('Error - No user exists for the given credentials');
		}

		// storing the user in the request object by creating a 'user' property on it
		request.user = user;

		// execute the next middleware
		next();
	} catch (error) {
		next(error);
	}
}

export default authorizeUser;
