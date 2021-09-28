import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getAppointments } from '../../services/appointmentService';
import TableBodyComponent from './TableBodyComponent';
import TableHeadComponent from './TableHeadComponent';
import { AuthContext } from './../../contexts/AuthContext';

/* How the table pagination will work:

Front-end
- send page number, and rows per page to the backend as query params
- whenever page number, or rows per page changes, send a request to fetch data according to the new pagination settings

Backend
- find the total number of records
- then find the total number of pages -> Math.ceil(totalNumRecords / rowsPerPage)
- if the page number < 1 OR page number > totalNumPages, then that page number is invalid (throw error)
- calculate the start index -> (pageNum - 1) * rowsPerPage
- calculate the end index -> pageNum * rowsPerPage
- make the query to the database to fetch a fixed number of records -> LIMIT (startIndex, endIndex)
- send the response to the front-end containing the following things
	- total number of records in the database table
	- the fetched data

*/

const columns = ['ID', 'Full name', 'Age', 'Phone number', 'Date', 'Time', 'Actions'];

function AppointmentTable() {
	const queryClient = useQueryClient();
	// variables related to pagination
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const rowsPerPageOptions = [25, 50, 100];

	const { user } = useContext(AuthContext);
	// query that will be responsible for fetching appointments from the server
	const requestData = { page, rowsPerPage, token: user.token };
	// the returned data will be an object that looks like this -> {totalAppointments: , appointments: [...]}
	const { data, isSuccess } = useQuery(['appointments', requestData], () =>
		getAppointments(requestData)
	);
	// the second argument is the zero-based index of the current page
	function handleChangePage(_, pageIndex) {
		setPage(pageIndex + 1);
		// when the user changes the page, we have to invalidate the appointments query so that it refetches new data
		queryClient.invalidateQueries('appointments');
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(Number.parseFloat(event.target.value));
		// We want to go back to the first page
		/* Let's say, a table has 25 rows in total and currently each page shows 5 rows, so there are 5 pages.
		Suppose we are on the 5th page and we changed rows per page to 25. If we don't go back to the first page,
		then page 5 will simply be empty since now each page is showing 25 rows */
		setPage(1);
		// when the user changes number of rows per page, we have to invalidate the appointments query so that it refetches new data
		queryClient.invalidateQueries('appointments');
	}
	return (
		<Paper elevation={0}>
			<TableContainer>
				<Table>
					<TableHeadComponent columns={columns} />
					{isSuccess && <TableBodyComponent appointments={data.appointments} />}
				</Table>
			</TableContainer>
			{isSuccess && (
				<TablePagination
					component="div"
					count={data.totalAppointments}
					page={page - 1}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={rowsPerPageOptions}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</Paper>
	);
}

export default AppointmentTable;
