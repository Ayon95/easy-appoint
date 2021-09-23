import React, { useRef } from 'react';
import { Formik } from 'formik';
import { makeStyles, styled } from '@mui/styles';
import InputField from './../components/Forms/InputField';
import Form from './../components/Forms/Form';
import { Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import stylesConfig from '../utils/stylesConfig';
import { signupValidationSchema } from '../services/formService';

const useStyles = makeStyles(theme => ({
	signupText: {
		marginBottom: theme.spacing(stylesConfig.formSpacing),
	},
}));

function Signup() {
	const formRef = useRef();
	const classes = useStyles();
	function handleSubmit(values, actions) {
		console.log(values.username, values.email, values.password, values.confirmPassword);
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
