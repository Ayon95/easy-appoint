import React from 'react';
import { Formik } from 'formik';
import { Button, Grid, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/lab';
import InputField from './InputField';
import { appointmentFormValidationSchema } from '../../services/formService';

const AppointmentForm = React.forwardRef((props, ref) => {
	const { initialValues, handleSubmit, buttonText, isLoading } = props;
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={appointmentFormValidationSchema}
			innerRef={ref}
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

					<Button type="submit" variant="contained" size="large" disabled={isLoading}>
						{buttonText}
					</Button>
				</form>
			)}
		</Formik>
	);
});

export default AppointmentForm;
