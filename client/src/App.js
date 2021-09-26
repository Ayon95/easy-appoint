import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Layout from './components/Layout/Layout';
import theme from './utils/theme';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './components/Generic/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';

function App() {
	return (
		<Router>
			<AuthContextProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div className="App">
						<Layout>
							<Switch>
								<Route exact path="/login">
									<Login />
								</Route>
								<Route exact path="/signup">
									<Signup />
								</Route>
								<ProtectedRoute path="/" exact={true} component={Home} />
							</Switch>
						</Layout>
					</div>
				</ThemeProvider>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
