import { NetworkError } from './errors';

// this function determines the query retry (refetch) behavior of React Query
export function setQueryRetry(_, error) {
	// turn off retry functionality if the error is a network error (no internet connection)
	// otherwise, a failed query will be retried up to 3 times before displaying an error
	return error.name === 'NetworkError' ? false : 3;
}

// this function will check if the user has internet connection, and throw an error in case of no connection
export function checkAndHandleNetworkError() {
	if (!window.navigator.onLine) {
		throw new NetworkError();
	}
}

// this utility function will check for errors and throw them
// any error thrown from this function can be accessed in the onError callback of React query
export async function checkAndHandleApiErrors(response) {
	// check if the response is ok or not, and throw error if the request failed
	if (!response.ok) {
		// the server will respond with an error object containing an error message
		const error = await response.json();
		throw new Error(error.errorMessage);
	}
}
