import { checkAndHandleApiErrors, checkAndHandleNetworkError } from '../utils/helpers';

const baseUrl = 'http://localhost:5000/appointments';

// this function will send a GET request to the server to fetch appointments
export async function getAppointments(requestData) {
	checkAndHandleNetworkError();
	const response = await fetch(
		`${baseUrl}?page=${requestData.page}&rows_per_page=${requestData.rowsPerPage}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${requestData.token}`,
			},
		}
	);
	await checkAndHandleApiErrors(response);
	const data = await response.json();
	return data;
}

// this function will send a GET request to fetch appointments by a search term
export async function getAppointmentsBySearch({ searchTerm, token }) {
	checkAndHandleNetworkError();
	const response = await fetch(`${baseUrl}/search?search_term=${searchTerm}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	await checkAndHandleApiErrors(response);
	const data = await response.json();
	return data;
}

// this function will send a POST request to the server for adding an appointment
export async function addAppointment(requestData) {
	checkAndHandleNetworkError();
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${requestData.token}`,
		},
		body: JSON.stringify(requestData.appointment),
	});
	await checkAndHandleApiErrors(response);
	const data = await response.json();
	return data;
}

// this function will send a DELETE request to the server to delete an appointment
export async function removeAppointment(requestData) {
	checkAndHandleNetworkError();
	const response = await fetch(`${baseUrl}/${requestData.appointmentId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${requestData.token}`,
		},
	});
	await checkAndHandleApiErrors(response);
	// if the request is successful, then the server will respond with a 204 (No content) status code
}
