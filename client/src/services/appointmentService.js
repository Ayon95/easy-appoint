const baseUrl = 'http://localhost:5000/appointments';

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
		// the server will respond with an error object containing an error message
		const error = await response.json();
		// this error can be accessed in the onError callback of React query
		throw new Error(error.errorMessage);
	}

	const data = await response.json();
	return data;
}
