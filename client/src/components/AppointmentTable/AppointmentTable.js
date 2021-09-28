import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getAppointments } from '../../services/appointmentService';
import TableBodyComponent from './TableBodyComponent';
import TableHeadComponent from './TableHeadComponent';

const columns = ['ID', 'Full name', 'Age', 'Phone number', 'Date', 'Time', 'Actions'];
const appointments = [
	{
		appointmentId: 1,
		fullName: 'Person A',
		age: 32,
		phoneNumber: '1234567899',
		date: 'Tue 28, 2021',
		time: '11:49 am',
	},

	{
		appointmentId: 2,
		fullName: 'Person B',
		age: 25,
		phoneNumber: '1234567988',
		date: 'Tue 28, 2021',
		time: '11:58 am',
	},
];

function AppointmentTable() {
	const queryClient = useQueryClient();
	// variables related to pagination
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const rowsPerPageOptions = [25, 50, 100];
	// query that will be responsible for fetching appointments from the server
	const requestData = { page, rowsPerPage };
	// the returned data will be an object that looks like this -> {totalAppointments: , appointments: [...]}
	const { data } = useQuery(['appointments', requestData], () => getAppointments(requestData));

	// the second argument is the zero-based index of the current page
	function handleChangePage(_, pageIndex) {
		setPage(pageIndex + 1);
		// when the user changes the page, we have to invalidate the appointments query so that it refetches new data
		queryClient.invalidateQueries('appointments');
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(Number.parseFloat(event.target.result));
		// We want to go back to the first page
		/* Let's say, a table has 25 rows in total and currently each page shows 5 rows, so there are 5 pages.
		Suppose we are on the 5th page and we changed rows per page to 25. If we don't go back to the first page,
		then page 5 will simply be empty since now each page is showing 25 rows */
		setPage(1);
		// when the user changes number of rows per page, we have to invalidate the appointments query so that it refetches new data
		queryClient.invalidateQueries('appointments');
	}
	return (
		<Paper>
			<TableContainer>
				<Table>
					<TableHeadComponent columns={columns} />
					<TableBodyComponent appointments={data.appointments} />
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={data.totalAppointments}
				page={page - 1}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

export default AppointmentTable;
