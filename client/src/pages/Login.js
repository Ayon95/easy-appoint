import React, { useContext, useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import InputField from './../components/Forms/InputField';
import AuthForm from '../components/Forms/AuthForm';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import stylesConfig from '../utils/stylesConfig';
import { loginValidationSchema } from '../services/formService';
import AlertComponent from '../components/Generic/AlertComponent';
import { AuthContext } from '../contexts/AuthContext';
import AuthPageContainer from './../components/Generic/AuthPageContainer';

function Login() {
	const { user, logIn, isLoading, error } = useContext(AuthContext);
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const formRef = useRef();
	const history = useHistory();

	function closeAlert() {
		setAlertIsOpen(false);
	}

	// take the user to the Home page if the login process was successful (and there is a user)
	useEffect(() => {
		if (user) history.push('/');
	}, [user, history]);

	async function handleSubmit(values) {
		// this will result in sending a POST request to the server for user login
		await logIn(values.username, values.password);
		// may need to show an alert (if there is any error)
		setAlertIsOpen(true);
	}
	return (
		<AuthPageContainer>
			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={loginValidationSchema}
				innerRef={formRef}
				onSubmit={handleSubmit}
				validateOnBlur={false}
				validateOnChange={false}
			>
				{formik => (
					<AuthForm
						title="Log In"
						handleSubmit={formik.handleSubmit}
						buttonText="Log In"
						isLoading={isLoading}
					>
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

						<Typography sx={{ marginBottom: stylesConfig.formSpacing }}>
							Don't have an account?{' '}
							<Link underline="hover" component={RouterLink} to="/signup">
								Sign up
							</Link>
						</Typography>
						{/* need to show an error alert if the login process failed due to an error */}
						{error && (
							<AlertComponent
								type="error"
								message={error}
								isOpen={alertIsOpen}
								closeAlert={closeAlert}
							/>
						)}
					</AuthForm>
				)}
			</Formik>
		</AuthPageContainer>
	);
}

export default Login;
