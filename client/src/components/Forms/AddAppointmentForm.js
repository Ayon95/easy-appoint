import React, { useContext, useRef } from 'react';
import { Formik } from 'formik';
import { Button, Grid, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/lab';
import InputField from './InputField';
import { addAppointmentValidationSchema } from '../../services/formService';
import { useMutation, useQueryClient } from 'react-query';
import { addAppointment } from '../../services/appointmentService';
import { format } from 'date-fns';
import { AuthContext } from '../../contexts/AuthContext';
import { setQueryRetry } from '../../utils/helpers';

function AddAppointmentForm() {
	const formRef = useRef();
	const queryClient = useQueryClient();
	const { user } = useContext(AuthContext);
	// this mutation will be responsible for sending a POST request to the server for adding an appointment
	// the requestData object will contain user token and the appointment object
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
			age: values.age,
			phoneNumber: values.phoneNumber,
			date: format(values.date, 'yyyy-MM-dd'),
			// 24-hour format is 'kk' in date-fns
			time: format(values.time, 'kk:mm:ss'),
			userId: user.userId,
		};

		// this will trigger the mutation function that will send a POST request to the server to add an appointment
		mutation.mutate({ token: user.token, appointment });
	}
	return (
		<Formik
			initialValues={{
				fullName: '',
				age: '',
				phoneNumber: '',
				date: Date.now(),
				time: Date.now(),
			}}
			validationSchema={addAppointmentValidationSchema}
			innerRef={formRef}
			onSubmit={handleSubmit}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{formik => (
				<form onSubmit={formik.handleSubmit} noValidate>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={8}>
							<InputField
								type="text"
								name="fullName"
								label="Full Name"
								value={formik.values.fullName}
								handleChange={formik.handleChange}
								// first check if the input field is touched
								errorMessage={formik.touched.fullName && formik.errors.fullName}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<InputField
								type="number"
								name="age"
								label="Age"
								value={formik.values.age}
								handleChange={formik.handleChange}
								// first check if the input field is touched
								errorMessage={formik.touched.age && formik.errors.age}
							/>
						</Grid>
					</Grid>
					<InputField
						type="text"
						name="phoneNumber"
						label="Phone Number"
						value={formik.values.phoneNumber}
						handleChange={formik.handleChange}
						errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
					/>

					<Grid container spacing={1} sx={{ marginBottom: 2.5 }}>
						<Grid item xs={12} sm={3}>
							<DatePicker
								renderInput={props => <TextField {...props} />}
								name="date"
								label="Date"
								value={formik.values.date}
								onChange={newValue => formik.setFieldValue('date', newValue)}
								minDate={Date.now()}
							/>
						</Grid>

						<Grid item xs={12} sm={3}>
							<TimePicker
								renderInput={props => <TextField {...props} />}
								name="time"
								label="Time"
								value={formik.values.time}
								onChange={newValue => formik.setFieldValue('time', newValue)}
							/>
						</Grid>
					</Grid>

					<Button type="submit" variant="contained" size="large" disabled={mutation.isLoading}>
						Add Appointment
					</Button>
				</form>
			)}
		</Formik>
	);
}

export default AddAppointmentForm;
