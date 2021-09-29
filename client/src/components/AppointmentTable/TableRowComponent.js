import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React, { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { removeAppointment } from '../../services/appointmentService';

function TableRowComponent({ appointment }) {
	const { appointment_id, full_name, age, phone_number, date, time } = appointment;
	const { user } = useContext(AuthContext);
	const queryClient = useQueryClient();
	// defining a mutation that will be responsible for sending a DELETE request to remove an appointment
	const removeAppointmentMutation = useMutation(requestData => removeAppointment(requestData), {
		onSuccess: () => queryClient.invalidateQueries('appointments'),
	});

	function handleClickDelete(appointmentId) {
		// this will open a dialog and ask the user to confirm the action
		const shouldDelete = window.confirm('Are you sure you want to remove this entry?');
		if (shouldDelete) {
			removeAppointmentMutation.mutate({ appointmentId, token: user.token });
		}
	}
	return (
		<TableRow>
			<TableCell>{appointment_id}</TableCell>
			<TableCell>{full_name}</TableCell>
			<TableCell>{age}</TableCell>
			<TableCell>{phone_number}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{time}</TableCell>
			<TableCell>
				<IconButton title="Edit">
					<EditOutlined color="primary" />
				</IconButton>
				<IconButton title="Delete" onClick={() => handleClickDelete(appointment_id)}>
					<DeleteOutlined color="error" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default TableRowComponent;
