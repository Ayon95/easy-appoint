import { createTheme } from '@mui/material';

const theme = createTheme({
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

export default theme;
