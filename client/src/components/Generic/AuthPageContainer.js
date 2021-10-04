import React from 'react';
import { styled } from '@mui/material/styles';
import stylesConfig from './../../utils/stylesConfig';

function AuthPageContainer({ children }) {
	return <PageContainer>{children}</PageContainer>;
}

export default AuthPageContainer;

const PageContainer = styled('main')(({ theme }) => ({
	padding: theme.spacing(stylesConfig.formContainerPadding),
	// subtracting the total height of Navbar (64px) and Footer (128px/16 = 8rem) from 100vh
	minHeight: 'calc(100vh - 8rem)',
	// the total height of Navbar (58.5px) and Footer becomes (122.5/16 = 7.65rem) when screen size is less than 600px
	[theme.breakpoints.down('sm')]: {
		minHeight: 'calc(100vh - 7.65rem)',
	},
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));
