import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import { useHistory } from 'react-router';

function NotFound() {
	const history = useHistory();
	return (
		<PageContainer>
			<PageContent>
				<TextContent>
					<Typography variant="h1" color="primary" fontWeight="bold">
						404
					</Typography>
					<Typography variant="h4">The page you were looking for does not exist.</Typography>
				</TextContent>
				<Button variant="contained" size="large" onClick={() => history.goBack()}>
					Go Back
				</Button>
			</PageContent>
		</PageContainer>
	);
}

export default NotFound;

const PageContainer = styled('main')(({ theme }) => ({
	padding: theme.spacing(2),
	// subtracting the total height of Navbar (64px) and Footer (128px/16 = 8rem) from 100vh
	height: 'calc(100vh - 8rem)',
	// the total height of Navbar (58.5px) and Footer becomes (122.5/16 = 7.65rem) when screen size is less than 600px
	[theme.breakpoints.down('sm')]: {
		height: 'calc(100vh - 7.65rem)',
	},
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

const PageContent = styled('div')({
	textAlign: 'center',
});

const TextContent = styled('div')(({ theme }) => ({
	marginBottom: theme.spacing(4),
}));
