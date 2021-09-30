import { SearchOutlined } from '@mui/icons-material';
import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from './../../contexts/AuthContext';
import { getAppointmentsBySearch } from '../../services/appointmentService';
import { setQueryRetry } from '../../utils/helpers';

/* How the appointment search will work:

Front-end
- Users can search for specific appointments by the person's name (search term)
- When the user enters a search term and clicks Search, a request will be sent to the server
- The Appointments table will show the searched appointments as long as there are searched appointments
- If there are no searched appointments, then the Appointments table will show the usual paginated list of appointments

Backend
- the server will extract the search term from the query string, and query the database with that search term
- once the database returns the array of appointments matching the search term, the server will send that to the front-end
- if no matching appointments are found, the server will send back an empty array

*/

function Searchbar({ setSearchedAppointments }) {
	const { user } = useContext(AuthContext);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResultMessage, setSearchResultMessage] = useState('');
	const requestData = { searchTerm, token: user.token };
	// defining a query that will be responsible for sending a GET request to fetch appointments by search term
	const { isLoading, refetch } = useQuery(
		['appointmentsSearch', requestData],
		() => getAppointmentsBySearch(requestData),
		{
			// we don't want this query to run automatically when the component mounts
			enabled: false,
			retry: setQueryRetry,
			// this data will be the fetched data (an array of appointments matching the search condition)
			onSuccess: data => {
				setSearchedAppointments(data);
				if (data.length === 0) setSearchResultMessage('No results found');
				else if (data.length === 1) setSearchResultMessage('1 result found');
				else setSearchResultMessage(`${data.length} results found`);
			},
		}
	);

	function handleClickSearch() {
		// if there is no search term, then don't run the query
		if (!searchTerm) return;
		// run the query to get the appointments matching the search condition
		refetch();
	}

	// when the user clicks the Reset button, we don't want to show the searched appointments anymore
	// we want to go back to showing the usual list of appointments
	function handleClickReset() {
		setSearchTerm('');
		setSearchResultMessage('');
		setSearchedAppointments([]);
	}
	return (
		<Grid container sx={{ marginBottom: 2 }} spacing={2}>
			<Grid item xs={12}>
				<TextField
					type="text"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder="Search by name..."
					fullWidth
					sx={{ marginRight: 1 }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchOutlined />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			{searchResultMessage && (
				<Grid item xs={12}>
					<Typography variant="body1" fontStyle="italic" fontWeight="bold">
						{searchResultMessage}
					</Typography>
				</Grid>
			)}
			{/* this container is acting both as a grid item and a grid container */}
			<Grid item xs={12} justifyContent="flex-end" container spacing={1}>
				<Grid item>
					<Button
						type="button"
						variant="contained"
						color="primary"
						size="large"
						disabled={isLoading}
						onClick={handleClickSearch}
					>
						Search
					</Button>
				</Grid>
				<Grid item>
					<Button
						type="button"
						variant="contained"
						color="secondary"
						size="large"
						onClick={handleClickReset}
					>
						Reset
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Searchbar;
