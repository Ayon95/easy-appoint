import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Modal = ({ title, children, modalIsOpen, closeModal }) => {
	return (
		<Dialog open={modalIsOpen} maxWidth="md" fullWidth onClose={closeModal}>
			{title && <DialogTitle color="primary">{title}</DialogTitle>}
			<DialogContent dividers>{children}</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={closeModal}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
