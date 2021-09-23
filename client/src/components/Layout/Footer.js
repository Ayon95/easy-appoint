import { Box, Typography } from '@mui/material';
import React from 'react';

function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				bgcolor: 'primary.main',
				color: 'primary.contrastText',
				p: 2.5,
				textAlign: 'center',
			}}
		>
			<Typography variant="body1">&copy; 2021. Developed by Mushfiq Rahman.</Typography>
		</Box>
	);
}

export default Footer;
