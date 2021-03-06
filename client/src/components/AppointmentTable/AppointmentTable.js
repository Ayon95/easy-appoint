import { Paper, Table, TableContainer, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { getAppointments } from '../../services/appointmentService';
import TableBodyComponent from './TableBodyComponent';
import TableHeadComponent from './TableHeadComponent';
import { AuthContext } from './../../contexts/AuthContext';
import Pagination from './Pagination';
import { setQueryRetry } from '../../utils/helpers';
import LoadingSpinner from '../Generic/LoadingSpinner';

/* How the table pagination will work:
Front-end
- send page number, and rows per page to the backend as query params
- whenever page number, or rows per page changes, send a request to fetch data according to the new pagination settings

Check Pagination component

Backend
- find the total number of records
- then find the total number of pages -> Math.ceil(totalNumRecords / rowsPerPage)
- if an invalid page number is provided then the page number will be set to 1
- calculate the start index -> (pageNum - 1) * rowsPerPage
- calculate the end index -> pageNum * rowsPerPage
- make the query to the database to fetch a fixed number of records -> LIMIT (startIndex, endIndex)
- send the response to the front-end containing the following things
	- total number of records in the database table
	- the fetched data
*/

/* How table sorting will work
- the rows can be sorted by date, full name, or age
- by default, the rows will be sorted by date in descending order (newest to oldest appointments)
- when searched appointments are being shown, sorting will be disabled

Front-end
- sorting information such as, sortBy and sortDirection will be sent to the backend as query params

Backend
- the server will extract those query parameters and use them in the database query
*/
const columns = [
	{ name: 'fullName', label: 'Full name' },
	{ name: 'age', label: 'Age' },
	{ name: 'phoneNumber', label: 'Phone number', sortingIsDisabled: true },
	{ name: 'date', label: 'Date' },
	{ name: 'time', label: 'Time', sortingIsDisabled: true },
	{ name: 'actions', label: 'Actions', sortingIsDisabled: true },
];

function AppointmentTable({ searchedAppointments, setAppointmentToUpdate, openModal, showAlert }) {
	// variables related to sorting
	const [sortBy, setSortBy] = useState('date');
	const [sortDirection, setSortDirection] = useState('desc');
	// variables related to pagination
	// note that page is not zero-based; first page is 1
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const rowsPerPageOptions = [10, 25, 50];

	const { user } = useContext(AuthContext);
	// query that will be responsible for fetching appointments from the server
	const requestData = {
		sortBy,
		sortDirection,
		page,
		rowsPerPage,
		token: user.token,
	};
	// the returned data will be an object that looks like this -> {totalAppointments: , appointments: [...]}
	const { data, isLoading, isSuccess } = useQuery(
		['appointments', requestData],
		() => getAppointments(requestData),
		{
			retry: setQueryRetry,
		}
	);

	// this function will be executed whenever a sortable column is clicked
	function handleClickSort(column) {
		const activeColumnClicked = column.name === sortBy;
		// if the active column (table is currently sorted by this column) is clicked, then toggle its sort direction
		if (activeColumnClicked) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		// if a column other than the current active column is clicked, then set its sort direction to 'desc'
		// by default, sort direction of inactive columns will be 'asc'
		else {
			setSortBy(column.name);
			setSortDirection('desc');
		}
	}

	if (isLoading) return <LoadingSpinner />;

	return (
		<>
			{data.appointments.length === 0 && (
				<Typography variant="h5" textAlign="center">
					You don't have any appointments
				</Typography>
			)}
			{data.appointments.length > 0 && (
				<Paper elevation={0}>
					<TableContainer>
						<Table>
							<TableHeadComponent
								columns={columns}
								sortBy={sortBy}
								sortDirection={sortDirection}
								handleClickSort={handleClickSort}
								searchedAppointments={searchedAppointments}
							/>
							{searchedAppointments.length === 0 && isSuccess && (
								<TableBodyComponent
									appointments={data.appointments}
									setAppointmentToUpdate={setAppointmentToUpdate}
									openModal={openModal}
									showAlert={showAlert}
								/>
							)}
							{searchedAppointments.length > 0 && (
								<TableBodyComponent
									appointments={searchedAppointments}
									setAppointmentToUpdate={setAppointmentToUpdate}
									openModal={openModal}
									showAlert={showAlert}
								/>
							)}
						</Table>
					</TableContainer>
					{searchedAppointments.length === 0 && isSuccess && (
						<Pagination
							count={data.totalAppointments}
							page={page - 1}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={rowsPerPageOptions}
							setPage={setPage}
							setRowsPerPage={setRowsPerPage}
						/>
					)}
				</Paper>
			)}
		</>
	);
}

export default AppointmentTable;
