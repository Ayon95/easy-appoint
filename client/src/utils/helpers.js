import { NetworkError } from './errors';
import jwtDecode from 'jwt-decode';

export let logoutTimerId;

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

// this function will calculate the time after which the user's token will expire and set a timer for that
// the user will be logged out when the timer finishes countdown
export function startLogoutTimer(token, logOut) {
	const decodedToken = jwtDecode(token);
	// calculating the remaining time - the token will expire after this remaining time
	// the remaining time is equal to the difference between some time in the future (expirationTime) and the current time
	const remainingTime = decodedToken.exp * 1000 - Date.now();
	// the timer will finish its countdown after this remainingTime, and the user will be logged out
	logoutTimerId = setTimeout(logOut, remainingTime);
}

// this function will check whether the token has expired or not
// When a user closes the app without logging out, and returns after a while, we have to check whether the token has expired or not
export function checkExpiredToken(token) {
	const decodedToken = jwtDecode(token);
	// if the expiration time (Unix timestamp) is less than the current timestamp, then it means the token has expired
	// note that the Unix timestamp is in seconds, so it needs to be converted to milliseconds
	return decodedToken.exp * 1000 < Date.now();
}
