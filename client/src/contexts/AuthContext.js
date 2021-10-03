import React, { useEffect, useState } from 'react';
import {
	checkAndHandleApiErrors,
	checkAndHandleNetworkError,
	checkExpiredToken,
	startLogoutTimer,
} from '../utils/helpers';

const baseUrl = 'http://localhost:5000/user';
export const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	// get user from local storage (if any) after this component mounts for the first time (when the app runs)
	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('EasyAppointUser'));
		if (!userData) return;
		// check if the token has expired or not
		const tokenIsExpired = checkExpiredToken(userData.token);
		// log the user out if the token is expired
		if (tokenIsExpired) {
			logOut();
			return;
		}
		// if the token hasn't expired yet, then start a new logout timer with the updated remaining time
		startLogoutTimer(userData.token, logOut);
		setUser(userData);
	}, []);

	// this function logs the user out
	function logOut() {
		// remove the token from local storage
		localStorage.removeItem('EasyAppointUser');
		// remove user from local state
		setUser(null);
	}

	// this async function will send a POST request to the server for user signup
	async function signUp(userData) {
		try {
			// check for network error (if there is any internet connection)
			checkAndHandleNetworkError();

			setIsLoading(true);
			setError('');
			const response = await fetch(`${baseUrl}/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData),
			});
			// in case an error occurs while processing the API call
			await checkAndHandleApiErrors(response);
			// if we reach this point, then it means that the request was successful
			const data = await response.json();
			// save the user data to local storage
			localStorage.setItem('EasyAppointUser', JSON.stringify(data));
			// start a timer that will log the user out when the token expires
			startLogoutTimer(data.token, logOut);

			setIsLoading(false);
			setUser(data);
		} catch (error) {
			setIsLoading(false);
			setError(error.message);
		}
	}

	// this async function will send a POST request for user login
	async function logIn(username, password) {
		try {
			checkAndHandleNetworkError();

			setIsLoading(true);
			setError('');
			const response = await fetch(`${baseUrl}/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			await checkAndHandleApiErrors(response);

			const data = await response.json();
			localStorage.setItem('EasyAppointUser', JSON.stringify(data));
			startLogoutTimer(data.token, logOut);

			setIsLoading(false);
			setUser(data);
		} catch (error) {
			setIsLoading(false);
			setError(error.message);
		}
	}

	const value = {
		user,
		isLoading,
		error,
		signUp,
		logIn,
		logOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
