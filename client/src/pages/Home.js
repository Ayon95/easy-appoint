import { Container, Typography } from '@mui/material';
import React from 'react';

function Home() {
	return (
		<Container sx={{ minHeight: '80.4vh' }}>
			<Typography variant="h3" textAlign="center" color="primary">
				Your Appointments
			</Typography>
		</Container>
	);
}

export default Home;
