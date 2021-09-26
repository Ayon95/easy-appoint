import React, { useContext, useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { makeStyles, styled } from '@mui/styles';
import InputField from './../components/Forms/InputField';
import Form from './../components/Forms/Form';
import { Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import stylesConfig from '../utils/stylesConfig';
import { signupValidationSchema } from '../services/formService';
import AlertComponent from '../components/Generic/AlertComponent';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
	signupText: {
		marginBottom: theme.spacing(stylesConfig.formSpacing),
	},
}));

function Signup() {
	const { user, signUp, isLoading, error } = useContext(AuthContext);
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const formRef = useRef();
	const classes = useStyles();
	const history = useHistory();

	function closeAlert() {
		setAlertIsOpen(false);
	}

	// take the user to the Home page if the signup process was successful (and there is a user)
	useEffect(() => {
		if (user) history.push('/');
	}, [user, history]);

	async function handleSubmit(values) {
		const userData = {
			username: values.username,
			email: values.email,
			...(values.organization && { organization: values.organization }),
			password: values.password,
		};
		// this will result in sending a POST request to the server for user signup
		await signUp(userData);
		// need to show an alert (if there is any error)
		setAlertIsOpen(true);
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
						{error && (
							<AlertComponent
								type="error"
								message={error}
								isOpen={alertIsOpen}
								closeAlert={closeAlert}
							/>
						)}
						{!error && (
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
