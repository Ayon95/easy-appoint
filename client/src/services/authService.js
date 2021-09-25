const baseUrl = 'http://localhost:5000/user';

// this async function will send a POST request to the server for user signup
export async function signUp(userData) {
	const response = await fetch(`${baseUrl}/signup`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userData),
	});
	// throw error in case of a failed request so that it is stored in the query's error state (the react query that is associated with this function)
	if (!response.ok) {
		// the server will respond with an error object containing an error message
		const error = await response.json();
		throw new Error(error.errorMessage);
	}
	// if we reach this point, then it means that the request was successful
	const data = await response.json();
	return data;
}

// this async function will send a POST request for user login
export async function logIn(username, password) {
	const response = await fetch(`${baseUrl}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.errorMessage);
	}

	const data = await response.json();
	return data;
}

// this function stores the received token in local storage
export function setToken(token) {
	localStorage.setItem('EasyAppointAuthToken', token);
}
