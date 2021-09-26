import { SearchOutlined } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

function Searchbar() {
	return (
		<SearchbarContainer>
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
			<Button type="button" variant="contained" color="primary" size="large">
				Search
			</Button>
		</SearchbarContainer>
	);
}

export default Searchbar;

const SearchbarContainer = styled('div')({
	display: 'flex',
});
