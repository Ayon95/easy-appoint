const baseUrl = 'http://localhost:5000/appointments';

// this function will send a GET request to the server to fetch appointments
export async function getAppointments(requestData) {
	const response = await fetch(
		`${baseUrl}?page=${requestData.page}&rows_per_page=${requestData.rowsPerPage}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${requestData.token}`,
			},
		}
	);

	if (!response.ok) {
		// the server will respond with an error object containing an error message
		const error = await response.json();
		// this error can be accessed in the onError callback of React query
		throw new Error(error.errorMessage);
	}

	const data = await response.json();
	return data;
}

// this function will send a POST request to the server for adding an appointment
export async function addAppointment(requestData) {
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${requestData.token}`,
		},
		body: JSON.stringify(requestData.appointment),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.errorMessage);
	}

	const data = await response.json();
	return data;
}
