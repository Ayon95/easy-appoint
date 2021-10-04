import { Container, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import Modal from './../components/Generic/Modal';
import Searchbar from '../components/Generic/Searchbar';
import AppointmentTable from '../components/AppointmentTable/AppointmentTable';
import UpdateAppointmentForm from '../components/Forms/UpdateAppointmentForm';
import AddAppointmentForm from '../components/Forms/AddAppointmentForm';
import withAlert from './../components/HOCs/withAlert';

const pageContainerStyles = { minHeight: '80.4vh', paddingX: 2, paddingY: 4 };

// If the user searches for specific appointments, then the table should show those appointments (without any pagination)

function Home({ showAlert }) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [searchedAppointments, setSearchedAppointments] = useState([]);
	const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);
	// we will use this state variable to determine whether or not a searched appointment is updated
	// if a searched appointment is updated, then we will have to refetch the 'appointmentsSearch' query to get the updated search results
	// the automatic refetch of 'appointmentsSearch' query is disabled, so we need this condition to do manual refetch when a searched appointment is updated
	const [searchedAppointmentUpdated, setSearchedAppointmentUpdated] = useState(false);
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
				<Typography variant="h4" color="primary" sx={{ marginBottom: { xs: 1.5, sm: 0 } }}>
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
			<Searchbar
				setSearchedAppointments={setSearchedAppointments}
				searchedAppointmentUpdated={searchedAppointmentUpdated}
				setSearchedAppointmentUpdated={setSearchedAppointmentUpdated}
			/>
			<AppointmentTable
				searchedAppointments={searchedAppointments}
				setAppointmentToUpdate={setAppointmentToUpdate}
				openModal={openModal}
				showAlert={showAlert}
			/>
			{modalIsOpen && (
				<Modal
					title={appointmentToUpdate ? 'Edit Appointment' : 'Add Appointment'}
					modalIsOpen={modalIsOpen}
					closeModal={closeModal}
				>
					{appointmentToUpdate ? (
						<UpdateAppointmentForm
							showAlert={showAlert}
							appointmentToUpdate={appointmentToUpdate}
							searchedAppointments={searchedAppointments}
							setSearchedAppointmentUpdated={setSearchedAppointmentUpdated}
						/>
					) : (
						<AddAppointmentForm showAlert={showAlert} />
					)}
				</Modal>
			)}
		</Container>
	);
}

export default withAlert(Home);

const TitleAndButtonContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-between',
	marginBottom: theme.spacing(2),
}));
