// error object for when the requested resource is not found
export class NonexistentResourceError extends Error {
	constructor(message) {
		super();
		this.name = 'NonexistentResourceError';
		this.message = message;
	}
}

// error object for when the Authorization header is missing or it does not contain a Bearer token
export class AuthHeaderError extends Error {
	constructor() {
		super();
		this.name = 'AuthHeaderError';
		this.message = 'Authorization header is missing, or it does not have a Bearer token';
	}
}

// error object for when incorrect password is provided
export class PasswordError extends Error {
	constructor() {
		super();
		this.name = 'PasswordError';
		this.message = 'Error - Incorrect password provided';
	}
}

// error object for when an unauthorized user tries to access a protected resource
export class UnauthorizedUserError extends Error {
	constructor() {
		super();
		this.name = 'UnauthorizedUserError';
		this.message = 'User is not authorized to access this resource';
	}
}

// error object for when a user tries to create an account with an email that is already in use
export class DuplicateUserError extends Error {
	constructor() {
		super();
		this.name = 'DuplicateUserError';
		this.message = 'Error - A user with this email or username already exists';
	}
}
