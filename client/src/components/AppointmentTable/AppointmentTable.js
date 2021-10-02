import { Paper, Table, TableContainer } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { getAppointments } from '../../services/appointmentService';
import TableBodyComponent from './TableBodyComponent';
import TableHeadComponent from './TableHeadComponent';
import { AuthContext } from './../../contexts/AuthContext';
import Pagination from './Pagination';
import { setQueryRetry } from '../../utils/helpers';

/* How the table pagination will work:

Front-end
- send page number, and rows per page to the backend as query params
- whenever page number, or rows per page changes, send a request to fetch data according to the new pagination settings

Check Pagination component

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

function AppointmentTable({ searchedAppointments, setAppointmentToUpdate, openModal, showAlert }) {
	// variables related to pagination
	// note that page is not zero-based; first page is 1
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const rowsPerPageOptions = [5];

	const { user } = useContext(AuthContext);
	// query that will be responsible for fetching appointments from the server
	const requestData = { page, rowsPerPage, token: user.token };
	// the returned data will be an object that looks like this -> {totalAppointments: , appointments: [...]}
	const { data, isSuccess } = useQuery(
		['appointments', requestData],
		() => getAppointments(requestData),
		{
			retry: setQueryRetry,
		}
	);

	return (
		<Paper elevation={0}>
			<TableContainer>
				<Table>
					<TableHeadComponent columns={columns} />
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
	);
}

export default AppointmentTable;
