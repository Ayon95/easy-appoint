import * as Yup from 'yup';

// validation schema for login form
export const loginValidationSchema = Yup.object({
	username: Yup.string().required('Username is required'),
	password: Yup.string().required('Password is required'),
});

// validation schema for Signup form
export const signupValidationSchema = Yup.object({
	username: Yup.string()
		.min(4, 'Username needs to be at least 4 characters long')
		.max(30, 'Username cannot exceed 30 characters')
		.required('Username is required'),
	email: Yup.string().email('Not a valid email').required('Email is required'),
	organization: Yup.string().max(100, 'Organization name must be within 100 characters'),
	password: Yup.string()
		.min(6, 'Password needs to be at least 6 characters long')
		.required('Password is required'),

	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords do not match')
		.required('Please confirm your password'),
});

/* Full name can only have letters and spaces.
Phone number needs to be at least 7 digits long and cannot be more than 15 digits in length. */
export const appointmentFormValidationSchema = Yup.object({
	fullName: Yup.string()
		.required('Full name is required')
		.matches(/^[a-z\s]+$/i, 'Not a valid name'),
	age: Yup.number().required('Age is required'),
	phoneNumber: Yup.string()
		.required('Phone number is required')
		.matches(/^[0-9]{7,15}$/, 'Not a valid phone number'),
});
