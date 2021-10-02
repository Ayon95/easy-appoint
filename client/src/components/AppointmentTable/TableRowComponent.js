import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { isToday } from 'date-fns';
import React, { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { removeAppointment } from '../../services/appointmentService';
import { setQueryRetry } from '../../utils/helpers';

// these styles will be added to the appointments whose dates are equal to today's date
const isTodayStyles = {
	backgroundColor: yellow[100],
	'& > *': {
		fontWeight: 'bold',
	},
};

function TableRowComponent({ appointment, setAppointmentToUpdate, openModal, showAlert }) {
	const { appointment_id, full_name, age, phone_number, date, time } = appointment;
	const { user } = useContext(AuthContext);
	const queryClient = useQueryClient();
	// defining a mutation that will be responsible for sending a DELETE request to remove an appointment
	const { mutate, isLoading } = useMutation(requestData => removeAppointment(requestData), {
		retry: setQueryRetry,
		onSuccess: () => {
			queryClient.invalidateQueries('appointments');
			// show success alert
			showAlert('success', 'Deleted appointment successfully!');
		},
	});

	function handleClickDelete(appointmentId) {
		// this will open a dialog and ask the user to confirm the action
		const shouldDelete = window.confirm('Are you sure you want to remove this entry?');
		if (shouldDelete) {
			mutate({ appointmentId, token: user.token });
		}
	}

	function handleClickEdit() {
		// when the edit icon button is clicked, we have to set the appointment that we want to edit
		// this way, other relevant components will know that the user wants to update an appointment
		const appointmentToUpdate = {
			appointmentId: appointment_id,
			fullName: full_name,
			age,
			phoneNumber: phone_number,
			date,
			time,
		};
		setAppointmentToUpdate(appointmentToUpdate);
		// open the modal that will show the Appointment form
		openModal();
	}
	return (
		<TableRow sx={isToday(new Date(date)) && isTodayStyles}>
			<TableCell>{appointment_id}</TableCell>
			<TableCell>{full_name}</TableCell>
			<TableCell>{age}</TableCell>
			<TableCell>{phone_number}</TableCell>
			<TableCell>{date}</TableCell>
			<TableCell>{time}</TableCell>
			<TableCell>
				<IconButton title="Edit" onClick={handleClickEdit}>
					<EditOutlined color="primary" />
				</IconButton>
				<IconButton
					title="Delete"
					onClick={() => handleClickDelete(appointment_id)}
					disabled={isLoading}
				>
					<DeleteOutlined color="error" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default TableRowComponent;
