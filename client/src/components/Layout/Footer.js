import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
	footerText: { color: '#fff' },
});

function Footer() {
	const classes = useStyles();
	return (
		<Box
			component="footer"
			sx={{
				bgcolor: 'primary.dark',
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
