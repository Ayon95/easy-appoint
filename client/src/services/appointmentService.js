const baseUrl = 'http://localhost:5000/appointment';

// this function will send a POST request to the server for adding an appointment
export async function addAppointment(appointmentData) {
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(appointmentData),
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
