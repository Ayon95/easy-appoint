import React from 'react';
import { Box, CircularProgress } from '@mui/material';

function LoadingSpinner() {
	return (
		<Box sx={{ textAlign: 'center', marginY: 2 }}>
			<CircularProgress />
		</Box>
	);
}

export default LoadingSpinner;
