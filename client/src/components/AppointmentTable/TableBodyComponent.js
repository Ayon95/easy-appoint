import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

function TableBodyComponent({ appointments }) {
	return (
		<TableBody>
			{appointments.map(appointment => (
				<TableRow key={appointment.appointmentId}>
					<TableCell>{appointment.appointmentId}</TableCell>
					<TableCell>{appointment.fullName}</TableCell>
					<TableCell>{appointment.age}</TableCell>
					<TableCell>{appointment.phoneNumber}</TableCell>
					<TableCell>{appointment.date}</TableCell>
					<TableCell>{appointment.time}</TableCell>
					<TableCell>
						<IconButton title="Edit">
							<EditOutlined color="primary" />
						</IconButton>
						<IconButton title="Delete">
							<DeleteOutlined color="error" />
						</IconButton>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default TableBodyComponent;
