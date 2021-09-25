import { Alert, Snackbar } from '@mui/material';
import React from 'react';

function AlertComponent({ type, message, isOpen, closeAlert }) {
	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={5000}
			onClose={closeAlert}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert severity={type} variant="filled">
				{message}
			</Alert>
		</Snackbar>
	);
}

export default AlertComponent;
