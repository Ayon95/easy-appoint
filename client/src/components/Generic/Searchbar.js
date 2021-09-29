import { SearchOutlined } from '@mui/icons-material';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import React from 'react';

function Searchbar() {
	return (
		<Grid container sx={{ marginBottom: 2 }} spacing={2}>
			<Grid item xs={12}>
				<TextField
					type="text"
					placeholder="Search by name..."
					fullWidth
					sx={{ marginRight: 1 }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchOutlined />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			{/* this container is acting both as a grid item and a grid container */}
			<Grid item xs={12} justifyContent="flex-end" container spacing={1}>
				<Grid item>
					<Button type="button" variant="contained" color="primary" size="large">
						Search
					</Button>
				</Grid>
				<Grid item>
					<Button type="button" variant="contained" color="secondary" size="large">
						Reset
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Searchbar;
