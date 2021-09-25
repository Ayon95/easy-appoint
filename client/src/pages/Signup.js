import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import { makeStyles, styled } from '@mui/styles';
import InputField from './../components/Forms/InputField';
import Form from './../components/Forms/Form';
import { Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import stylesConfig from '../utils/stylesConfig';
import { signupValidationSchema } from '../services/formService';
import { useMutation, useQueryClient } from 'react-query';
import { signUp, setToken } from '../services/authService';
import AlertComponent from '../components/Generic/AlertComponent';

const useStyles = makeStyles(theme => ({
	signupText: {
		marginBottom: theme.spacing(stylesConfig.formSpacing),
	},
}));

function Signup() {
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const formRef = useRef();
	const classes = useStyles();
	const queryClient = useQueryClient();
	// the mutation function will be called when we call mutate() which we will call when the form is submitted
	const signupMutation = useMutation(userData => signUp(userData), {
		// the data that onSuccess handler will receive will be the response sent from the server (an object containing user information)
		onSuccess: userData => {
			// need to show a success alert
			openAlert();
			// store the token in local storage
			setToken(userData.token);
			// cache the user data and map it to a query called 'user'
			queryClient.setQueryData('user', userData);
		},
		// this function will be called if the mutation encounters an error; it will receive the error object
		// need to show an error alert
		onError: error => openAlert(),
	});

	function openAlert() {
		setAlertIsOpen(true);
	}

	function closeAlert() {
		setAlertIsOpen(false);
	}

	function handleSubmit(values, actions) {
		const userData = {
			username: values.username,
			email: values.email,
			...(values.organization && { organization: values.organization }),
			password: values.password,
		};
		// this will result in sending a POST request to the server for user signup
		signupMutation.mutate(userData);
		actions.resetForm();
	}
	return (
		<SignupFormContainer>
			<Formik
				initialValues={{
					username: '',
					email: '',
					organization: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={signupValidationSchema}
				innerRef={formRef}
				onSubmit={handleSubmit}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{formik => (
					<Form title="Sign Up" handleSubmit={formik.handleSubmit} buttonText="Sign up">
						<Grid container spacing={1}>
							<Grid item xs={12} sm={5}>
								<InputField
									type="text"
									name="username"
									label="Username"
									value={formik.values.username}
									handleChange={formik.handleChange}
									// first check if the input field is touched
									errorMessage={formik.touched.username && formik.errors.username}
								/>
							</Grid>
							<Grid item xs={12} sm={7}>
								<InputField
									type="email"
									name="email"
									label="Email"
									value={formik.values.email}
									handleChange={formik.handleChange}
									// first check if the input field is touched
									errorMessage={formik.touched.email && formik.errors.email}
								/>
							</Grid>
						</Grid>

						<InputField
							type="text"
							name="organization"
							label="Organization"
							value={formik.values.organization}
							handleChange={formik.handleChange}
							// first check if the input field is touched
							errorMessage={formik.touched.organization && formik.errors.organization}
						/>

						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
								<InputField
									type="password"
									name="password"
									label="Password"
									value={formik.values.password}
									handleChange={formik.handleChange}
									// first check if the input field is touched
									errorMessage={formik.touched.password && formik.errors.password}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<InputField
									type="password"
									name="confirmPassword"
									label="Confirm Password"
									value={formik.values.confirmPassword}
									handleChange={formik.handleChange}
									// first check if the input field is touched
									errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
								/>
							</Grid>
						</Grid>

						<Typography className={classes.signupText}>
							Already have an account?{' '}
							<Link underline="hover" component={RouterLink} to="/">
								Log in
							</Link>
						</Typography>
						{signupMutation.isError && (
							<AlertComponent
								type="error"
								message={signupMutation.error.message}
								isOpen={alertIsOpen}
								closeAlert={closeAlert}
							/>
						)}
						{signupMutation.isSuccess && (
							<AlertComponent
								type="success"
								message="Account created successfully!"
								isOpen={alertIsOpen}
								closeAlert={closeAlert}
							/>
						)}
					</Form>
				)}
			</Formik>
		</SignupFormContainer>
	);
}

const SignupFormContainer = styled('div')(({ theme }) => ({
	padding: theme.spacing(stylesConfig.formContainerPadding),
	minHeight: '81.9vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

export default Signup;
