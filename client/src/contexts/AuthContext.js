import React, { useState } from 'react';

const baseUrl = 'http://localhost:5000/user';
export const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	// this async function will send a POST request to the server for user signup
	async function signUp(userData) {
		try {
			setIsLoading(true);
			setError('');
			const response = await fetch(`${baseUrl}/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData),
			});
			// in case an error occurs
			if (!response.ok) {
				// the server will respond with an error object containing an error message
				const error = await response.json();
				throw new Error(error.errorMessage);
			}
			// if we reach this point, then it means that the request was successful
			const data = await response.json();
			// save the token to local storage
			localStorage.setItem('EasyAppointAuthToken', data.token);

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
			setIsLoading(true);
			setError('');
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
			// save the token to local storage
			localStorage.setItem('EasyAppointAuthToken', data.token);

			setIsLoading(false);
			setUser(data);
		} catch (error) {
			setIsLoading(false);
			setError(error.message);
		}
	}

	// this function logs the user out
	function logOut() {
		// remove the token from local storage
		localStorage.removeItem('EasyAppointAuthToken');
		// remove user from local state
		setUser(null);
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
