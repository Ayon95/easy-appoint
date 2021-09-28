import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

function TableBodyComponent({ appointments }) {
	// an appointment object will look like {appointment_id: , full_name: , age: , phone_number: , date: , time: }
	return (
		<TableBody>
			{appointments.map(appointment => (
				<TableRow key={appointment.appointment_id}>
					<TableCell>{appointment.appointment_id}</TableCell>
					<TableCell>{appointment.full_name}</TableCell>
					<TableCell>{appointment.age}</TableCell>
					<TableCell>{appointment.phone_number}</TableCell>
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
