import React, { useContext } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
	navbar: {
		padding: theme.spacing(2),
		justifyContent: 'space-between',
	},
}));

function Navbar() {
	const { user, logOut } = useContext(AuthContext);
	const classes = useStyles();
	const history = useHistory();

	function logoutClickHandler() {
		logOut();
		// redirect the user to the login page
		history.push('/login');
	}

	return (
		<AppBar position="static" elevation={0}>
			<Toolbar className={classes.navbar}>
				<Typography variant="h5">EasyAppoint</Typography>
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
