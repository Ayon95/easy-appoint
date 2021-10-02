import React, { useState } from 'react';
import AlertComponent from '../Generic/AlertComponent';

function withAlert(WrappedComponent) {
	// this is the enhanced component that will be returned from this HOC
	return function (props) {
		const [message, setMessage] = useState('');
		// severity of the alert; can be 'success', 'error', or 'warning'
		const [type, setType] = useState('success');
		const [alertIsOpen, setAlertIsOpen] = useState(false);

		function showAlert(type, message) {
			setType(type);
			setMessage(message);
			setAlertIsOpen(true);
		}

		function closeAlert() {
			setAlertIsOpen(false);
		}

		return (
			<>
				<WrappedComponent showAlert={showAlert} {...props} />
				<AlertComponent
					type={type}
					message={message}
					isOpen={alertIsOpen}
					closeAlert={closeAlert}
				/>
			</>
		);
	};
}

export default withAlert;
