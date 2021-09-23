import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
	textField: {
		marginBottom: theme.spacing(2.5),
	},
}));

const InputField = props => {
	const classes = useStyles();
	const { type, name, label, value, handleChange, errorMessage, ...rest } = props;
	return (
		<TextField
			className={classes.textField}
			fullWidth
			type={type}
			variant="outlined"
			id={name}
			name={name}
			label={label}
			value={value}
			onChange={handleChange}
			// if there is an error message then add the error prop and set the helper text prop to that error message
			{...(errorMessage && { error: true, helperText: errorMessage })}
			{...rest}
		/>
	);
};

export default InputField;
