import { TextField } from '@mui/material';

const InputField = props => {
	const { type, name, label, value, handleChange, errorMessage, ...rest } = props;
	return (
		<TextField
			sx={{ marginBottom: 2.5 }}
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
