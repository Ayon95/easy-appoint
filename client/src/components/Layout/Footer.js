import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
				p: 2.5,
				textAlign: 'center',
			}}
		>
			<Typography variant="body1" className={classes.footerText}>
				&copy; 2021. Developed by Mushfiq Rahman.
			</Typography>
		</Box>
	);
}

export default Footer;
