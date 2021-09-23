import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navbar() {
	return (
		<AppBar position="static" elevation={0}>
			<Toolbar>
				<Typography variant="h5">EasyAppoint</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
