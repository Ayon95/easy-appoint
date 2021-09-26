import { Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import Modal from './../components/Generic/Modal';

const pageContainerStyles = { minHeight: '80.4vh', paddingX: 2, paddingY: 4 };

function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	// when the 'Add Appointment' button is clicked, we have to open the modal that contains a form to add an appointment
	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setModalIsOpen(false);
	}
	return (
		<Container sx={pageContainerStyles} maxWidth={false}>
			<TitleAndButtonContainer>
				<Typography variant="h4" textAlign="center" color="primary">
					Your Appointments
				</Typography>
				<Button
					type="button"
					variant="contained"
					color="primary"
					size="large"
					startIcon={<Add />}
					onClick={openModal}
				>
					Add Appointment
				</Button>
			</TitleAndButtonContainer>
			{modalIsOpen && (
				<Modal title="Add Appointment" modalIsOpen={modalIsOpen} closeModal={closeModal}>
					This is where the form will be
				</Modal>
			)}
		</Container>
	);
}

export default Home;

const TitleAndButtonContainer = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
});
