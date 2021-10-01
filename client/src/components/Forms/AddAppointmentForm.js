import React, { useContext, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import { addAppointment } from '../../services/appointmentService';
import { setQueryRetry } from '../../utils/helpers';
import AppointmentForm from './AppointmentForm';
import { AuthContext } from '../../contexts/AuthContext';

function AddAppointmentForm() {
	const initialValues = {
		fullName: '',
		age: '',
		phoneNumber: '',
		date: Date.now(),
		time: Date.now(),
	};
	const formRef = useRef();
	const queryClient = useQueryClient();
	const { user } = useContext(AuthContext);
	// This mutation will be responsible for sending a POST request to create an appointment
	// The requestData object will contain user token and the appointment object
	const mutation = useMutation(requestData => addAppointment(requestData), {
		retry: setQueryRetry,
		// this function will be called after the mutation was performed successfully
		onSuccess: () => {
			// invalidate the 'appointments' query so that it re-fetches the updated data
			queryClient.invalidateQueries('appointments');
			// reset the form
			formRef.current.resetForm();
		},
	});

	function handleSubmit(values) {
		const appointment = {
			fullName: values.fullName,
			age: Number.parseFloat(values.age),
			phoneNumber: values.phoneNumber,
			date: format(new Date(values.date), 'yyyy-MM-dd'),
			// 24-hour format is 'kk' in date-fns
			time: format(new Date(values.time), 'kk:mm:ss'),
			userId: user.userId,
		};
		// this will trigger the mutation function that will send a POST request to the server to add an appointment
		mutation.mutate({ token: user.token, appointment });
	}
	return (
		<AppointmentForm
			initialValues={initialValues}
			handleSubmit={handleSubmit}
			buttonText="Add Appointment"
			isLoading={mutation.isLoading}
			ref={formRef}
		/>
	);
}

export default AddAppointmentForm;
