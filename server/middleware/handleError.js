function handleError(error, request, response, next) {
	console.log(error.stack);
	switch (error.name) {
		// handling error that is thrown when the requested resource could not be found
		case 'NonexistentResourceError':
			return response.status(404).json({ errorMessage: error.message });
		// error that is thrown when a user tries to create an account with an email or username that is already in use
		case 'DuplicateUserError':
			return response.status(409).json({ errorMessage: error.message });
		// AuthHeaderError that is thrown when the Authorization header is missing or it does not contain a Bearer token
		case 'AuthHeaderError':
			return response.status(400).json({ errorMessage: error.message });
		// error that is thrown when incorrect password is provided
		case 'PasswordError':
			return response.status(401).json({ errorMessage: error.message });
		// handling JsonWebTokenError exception that is thrown when a token cannot be verified
		case 'JsonWebTokenError':
			return response.status(401).json({ errorMessage: 'Token is invalid' });
		// handling TokenExpiredError exception that is thrown when a token is expired
		case 'TokenExpiredError':
			return response.status(401).json({ errorMessage: 'Token is expired' });
	}
	// all other errors will be forwarded to Express' built-in error handler
	next(error);
}

export default handleError;
