import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Layout from './components/Layout/Layout';
import theme from './utils/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Layout />
			</div>
		</ThemeProvider>
	);
}

export default App;
