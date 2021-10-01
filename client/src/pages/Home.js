import { Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import Modal from './../components/Generic/Modal';
import Searchbar from '../components/Generic/Searchbar';
import AppointmentTable from '../components/AppointmentTable/AppointmentTable';
import UpdateAppointmentForm from '../components/Forms/UpdateAppointmentForm';
import AddAppointmentForm from '../components/Forms/AddAppointmentForm';

const pageContainerStyles = { minHeight: '80.4vh', paddingX: 2, paddingY: 4 };

// If the user searches for specific appointments, then the table should show those appointments (without any pagination)

function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [searchedAppointments, setSearchedAppointments] = useState([]);
	const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);
	// when the 'Add Appointment' button is clicked, we have to open the modal that contains a form to add an appointment
	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setModalIsOpen(false);
		// if there is an appointment to update, then remove it because the user is closing the Update form
		setAppointmentToUpdate(null);
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
			<Searchbar setSearchedAppointments={setSearchedAppointments} />
			<AppointmentTable
				searchedAppointments={searchedAppointments}
				setAppointmentToUpdate={setAppointmentToUpdate}
				openModal={openModal}
			/>
			{modalIsOpen && (
				<Modal
					title={appointmentToUpdate ? 'Edit Appointment' : 'Add Appointment'}
					modalIsOpen={modalIsOpen}
					closeModal={closeModal}
				>
					{appointmentToUpdate ? (
						<UpdateAppointmentForm appointmentToUpdate={appointmentToUpdate} />
					) : (
						<AddAppointmentForm />
					)}
				</Modal>
			)}
		</Container>
	);
}

export default Home;

const TitleAndButtonContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: theme.spacing(2),
}));
