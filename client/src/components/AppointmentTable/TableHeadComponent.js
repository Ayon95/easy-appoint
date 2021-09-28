import { TableCell, TableHead, TableRow } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React from 'react';

const tableCellStyles = {
	fontWeight: 'bold',
	fontSize: 16,
	color: 'primary.dark',
};

function TableHeadComponent({ columns }) {
	return (
		<TableHead sx={{ backgroundColor: `${indigo[100]}` }}>
			<TableRow>
				{columns.map(column => (
					<TableCell key={column} sx={tableCellStyles}>
						{column}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default TableHeadComponent;
