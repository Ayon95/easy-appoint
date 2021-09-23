import React from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import stylesConfig from '../../utils/stylesConfig';

const useStyles = makeStyles(theme => ({
	form: {
		borderRadius: '4px',
		padding: theme.spacing(stylesConfig.formPadding),
		backgroundColor: '#fff',
		boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
		width: '100%',
		maxWidth: '50rem',
	},

	formTitle: {
		marginBottom: theme.spacing(stylesConfig.formSpacing),
	},
}));

function Form({ title, handleSubmit, buttonText, children }) {
	const classes = useStyles();
	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Typography variant="h4" color="primary" className={classes.formTitle}>
				{title}
			</Typography>
			{children}
			<Button type="submit" variant="contained" size="large">
				{buttonText}
			</Button>
		</form>
	);
}

export default Form;
