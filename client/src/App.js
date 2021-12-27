import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import Layout from './components/Layout/Layout';
import theme from './utils/theme';
import ProtectedRoute from './components/Generic/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';
import LoadingSpinner from './components/Generic/LoadingSpinner';

const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Home = React.lazy(() => import('./pages/Home'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<Router>
			<AuthContextProvider>
				<ThemeProvider theme={theme}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<CssBaseline />
						<div className="App">
							<Layout>
								<Suspense fallback={<LoadingSpinner />}>
									<Switch>
										<Route exact path="/login">
											<Login />
										</Route>
										<Route exact path="/signup">
											<Signup />
										</Route>
										<ProtectedRoute path="/" exact={true} component={Home} />
										<Route path="*">
											<NotFound />
										</Route>
									</Switch>
								</Suspense>
							</Layout>
						</div>
					</LocalizationProvider>
				</ThemeProvider>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
