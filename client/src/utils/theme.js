import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
	palette: {
		primary: {
			main: '#6018cc',
		},
		secondary: {
			main: '#db0b5e',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: '#e7e6ff',
				},
			},
		},
	},
});

// applying responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
