import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function ProtectedRoute({ path, exact, component: Component }) {
	const { user } = useContext(AuthContext);
	return (
		<Route
			path={path}
			exact={exact || false}
			render={props => (user ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	);
}

export default ProtectedRoute;
