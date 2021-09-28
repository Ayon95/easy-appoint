import { Table, TableContainer } from '@mui/material';
import React from 'react';
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
	return (
		<TableContainer>
			<Table>
				<TableHeadComponent columns={columns} />
				<TableBodyComponent appointments={appointments} />
			</Table>
		</TableContainer>
	);
}

export default AppointmentTable;
