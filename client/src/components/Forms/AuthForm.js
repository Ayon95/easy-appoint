import React from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import stylesConfig from '../../utils/stylesConfig';

function AuthForm({ title, handleSubmit, buttonText, isLoading, children }) {
	return (
		<FormComponent onSubmit={handleSubmit} noValidate>
			<Typography variant="h4" color="primary" sx={{ marginBottom: stylesConfig.formSpacing }}>
				{title}
			</Typography>
			{children}
			<Button type="submit" variant="contained" size="large" disabled={isLoading}>
				{buttonText}
			</Button>
		</FormComponent>
	);
}

const FormComponent = styled('form')(({ theme }) => ({
	borderRadius: '4px',
	padding: theme.spacing(stylesConfig.formPadding),
	backgroundColor: '#fff',
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	width: '100%',
	maxWidth: '50rem',
}));

export default AuthForm;
