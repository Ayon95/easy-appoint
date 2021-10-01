import React, { useContext, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import { AuthContext } from '../../contexts/AuthContext';
import { updateAppointment } from '../../services/appointmentService';
import { setQueryRetry } from '../../utils/helpers';
import AppointmentForm from './AppointmentForm';

function UpdateAppointmentForm(props) {
	const { appointmentToUpdate, searchedAppointments, setSearchedAppointmentUpdated } = props;
	const { appointmentId, fullName, age, phoneNumber, date, time } = appointmentToUpdate;
	const initialValues = {
		fullName,
		age,
		phoneNumber,
		date,
		// we need to combine the date and time portion to convert it into a valid Date object
		// this will give the correct time value in the time picker
		// date will be something like 'Tue Oct 5, 2021' and time will be something like '7:23 PM'
		// this is the format of date and time values returned from the database when the client app fetches appointments from the server
		time: new Date(`${date}, ${time}`),
	};
	const formRef = useRef();
	const queryClient = useQueryClient();
	const { user } = useContext(AuthContext);
	// This mutation will be responsible for sending a PUT request to update an appointment
	// The requestData object will contain user token and the appointment object
	const mutation = useMutation(requestData => updateAppointment(requestData), {
		retry: setQueryRetry,
		// this function will be called after the mutation was performed successfully
		onSuccess: () => {
			// invalidate the 'appointments' query so that it re-fetches the updated data
			queryClient.invalidateQueries('appointments');
			// if currently there are searched appointments (table is showing searched appointments), then that means the user has updated a searched appointment
			// in that case, we have to notify Searchbar when it should manually refetch the 'appointmentsSearch' query (in Searchbar.js)
			if (searchedAppointments.length > 0) setSearchedAppointmentUpdated(true);
			// reset the form with these input values
			formRef.current.resetForm({
				values: {
					fullName: '',
					age: '',
					phoneNumber: '',
					date: Date.now(),
					time: Date.now(),
				},
			});
		},
	});

	function handleSubmit(values) {
		const appointment = {
			appointmentId,
			fullName: values.fullName,
			age: Number.parseFloat(values.age),
			phoneNumber: values.phoneNumber,
			date: format(new Date(values.date), 'yyyy-MM-dd'),
			// 24-hour format is 'kk' in date-fns
			time: format(new Date(values.time), 'kk:mm:ss'),
		};
		// this will trigger the mutation function that will send a PUT request to the server to update an appointment
		mutation.mutate({ token: user.token, appointment });
	}
	return (
		<AppointmentForm
			initialValues={initialValues}
			handleSubmit={handleSubmit}
			buttonText="Edit Appointment"
			isLoading={mutation.isLoading}
			ref={formRef}
		/>
	);
}

export default UpdateAppointmentForm;
