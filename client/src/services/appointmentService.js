import { checkAndHandleApiErrors, checkAndHandleNetworkError } from '../utils/helpers';

const baseUrl = 'https://easy-appoint-mushfiq.herokuapp.com/appointments';

// this function will send a GET request to the server to fetch appointments
export async function getAppointments(requestData) {
	const { page, rowsPerPage, sortBy, sortDirection, token } = requestData;
	checkAndHandleNetworkError();
	const response = await fetch(
		`${baseUrl}?page=${page}&rows_per_page=${rowsPerPage}&sort_by=${sortBy}&sort_direction=${sortDirection}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
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

// this function will send a PUT request to update an appointment
export async function updateAppointment({ token, appointment }) {
	checkAndHandleNetworkError();
	const response = await fetch(`${baseUrl}/${appointment.appointmentId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(appointment),
	});
	await checkAndHandleApiErrors(response);
	const data = await response.json();
	return data;
}

// this function will send a DELETE request to the server to delete an appointment
export async function removeAppointment({ token, appointmentId }) {
	checkAndHandleNetworkError();
	const response = await fetch(`${baseUrl}/${appointmentId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	await checkAndHandleApiErrors(response);
	// if the request is successful, then the server will respond with a 204 (No content) status code
}
