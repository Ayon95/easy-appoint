import React, { useContext, useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import InputField from './../components/Forms/InputField';
import AuthForm from '../components/Forms/AuthForm';
import { Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import stylesConfig from '../utils/stylesConfig';
import { signupValidationSchema } from '../services/formService';
import { AuthContext } from '../contexts/AuthContext';
import withAlert from '../components/HOCs/withAlert';
import AuthPageContainer from './../components/Generic/AuthPageContainer';

function Signup({ showAlert }) {
	const [signupProcessed, setSignupProcessed] = useState(false);
	const { user, signUp, isLoading, error } = useContext(AuthContext);
	const formRef = useRef();
	const history = useHistory();

	// take the user to the Home page if the signup process was successful (and there is a user)
	useEffect(() => {
		if (user) history.push('/');
	}, [user, history]);

	// if there is an error after form submission, then show error alert, otherwise show success alert
	// To show the correct type of alert, we need to listen for changes in error in a useEffect
	// we cannot simply show the alert in handleSubmit after signUp because setting the error state is asynchronous
	useEffect(() => {
		// we need to show an alert only after the signup form is submitted and the request has been processed
		if (!signupProcessed) return;
		if (error) showAlert('error', error);
		else showAlert('success', 'Account created successfully!');
		// alert has been shown so reset signupProcessed to false
		setSignupProcessed(false);
	}, [signupProcessed, error, showAlert]);

	async function handleSubmit(values) {
		const userData = {
			username: values.username,
			email: values.email,
			...(values.organization && { organization: values.organization }),
			password: values.password,
		};
		// this will result in sending a POST request to the server for user signup
		await signUp(userData);
		setSignupProcessed(true);
	}
	return (
		<AuthPageContainer>
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
					<AuthForm
						title="Sign Up"
						handleSubmit={formik.handleSubmit}
						buttonText="Sign up"
						isLoading={isLoading}
					>
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
						<Typography sx={{ marginBottom: stylesConfig.formSpacing }}>
							Already have an account?{' '}
							<Link underline="hover" component={RouterLink} to="/">
								Log in
							</Link>
						</Typography>
					</AuthForm>
				)}
			</Formik>
		</AuthPageContainer>
	);
}

export default withAlert(Signup);
