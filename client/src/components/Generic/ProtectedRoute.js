import React from 'react';
import { useQueryClient } from 'react-query';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ path, exact, component: Component }) {
	const queryClient = useQueryClient();
	// getting the user data of the logged-in user
	const user = queryClient.getQueryData('user');
	return (
		<Route
			path={path}
			exact={exact || false}
			render={props => (user ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	);
}

export default ProtectedRoute;
