import { TableBody } from '@mui/material';
import React from 'react';
import TableRowComponent from './TableRowComponent';

function TableBodyComponent({ appointments, setAppointmentToUpdate, openModal }) {
	// an appointment object will look like {appointment_id: , full_name: , age: , phone_number: , date: , time: }
	return (
		<TableBody>
			{appointments.map(appointment => (
				<TableRowComponent
					key={appointment.appointment_id}
					appointment={appointment}
					setAppointmentToUpdate={setAppointmentToUpdate}
					openModal={openModal}
				/>
			))}
		</TableBody>
	);
}

export default TableBodyComponent;
