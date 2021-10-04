import React, { useContext } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { logoutAlertTimerId, logoutTimerId } from '../../utils/helpers';

const navbarStyles = {
	padding: 2,
	justifyContent: 'space-between',
};

function Navbar() {
	const { user, logOut } = useContext(AuthContext);
	const history = useHistory();

	function logoutClickHandler() {
		logOut();
		// clear the logout timer
		clearTimeout(logoutTimerId);
		// clear the logout alert timer
		clearTimeout(logoutAlertTimerId);
		// redirect the user to the login page
		history.push('/login');
	}

	return (
		<AppBar position="static" elevation={0}>
			<Toolbar sx={navbarStyles}>
				<Typography variant="h5">{user ? `Hello, ${user.username}` : 'EasyAppoint'}</Typography>
				{user && (
					<Button
						type="button"
						color="secondary"
						variant="contained"
						size="large"
						onClick={logoutClickHandler}
					>
						Log out
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
