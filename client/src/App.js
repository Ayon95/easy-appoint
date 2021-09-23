import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Layout from './components/Layout/Layout';
import theme from './utils/theme';
import Login from './pages/Login';

function App() {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="App">
					<Layout>
						<Switch>
							<Route exact path="/">
								<Login />
							</Route>
						</Switch>
					</Layout>
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
