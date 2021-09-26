import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
	homeContainer: {
		minHeight: '80.4vh',
	},
});

function Home() {
	const classes = useStyles();
	return (
		<Container className={classes.homeContainer}>
			<Typography variant="h3" textAlign="center" color="primary">
				Your Appointments
			</Typography>
		</Container>
	);
}

export default Home;
