import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#6018cc',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: '#dbddff',
				},
			},
		},
	},
});

export default theme;
