import React, { useRef } from 'react';
import { Formik } from 'formik';
import { makeStyles, styled } from '@mui/styles';
import InputField from './../components/Forms/InputField';
import Form from './../components/Forms/Form';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import stylesConfig from '../utils/stylesConfig';
import { loginValidationSchema } from '../services/formService';

const useStyles = makeStyles(theme => ({
	signupText: {
		marginBottom: theme.spacing(stylesConfig.formSpacing),
	},
}));

function Login() {
	const formRef = useRef();
	const classes = useStyles();
	function handleSubmit(values, actions) {
		console.log(values.username, values.password);
		actions.resetForm();
	}
	return (
		<LoginFormContainer>
			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={loginValidationSchema}
				innerRef={formRef}
				onSubmit={handleSubmit}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{formik => (
					<Form title="Log In" handleSubmit={formik.handleSubmit} buttonText="Log In">
						<InputField
							type="text"
							name="username"
							label="Username"
							value={formik.values.username}
							handleChange={formik.handleChange}
							// first check if the input field is touched
							errorMessage={formik.touched.username && formik.errors.username}
						/>
						<InputField
							type="password"
							name="password"
							label="Password"
							value={formik.values.password}
							handleChange={formik.handleChange}
							// first check if the input field is touched
							errorMessage={formik.touched.password && formik.errors.password}
						/>

						<Typography className={classes.signupText}>
							Don't have an account?{' '}
							<Link underline="hover" component={RouterLink} to="/signup">
								Sign up
							</Link>
						</Typography>
					</Form>
				)}
			</Formik>
		</LoginFormContainer>
	);
}

const LoginFormContainer = styled('div')(({ theme }) => ({
	padding: theme.spacing(stylesConfig.formContainerPadding),
	minHeight: '81.9vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

export default Login;
