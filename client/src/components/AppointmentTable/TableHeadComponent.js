import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React from 'react';

const tableCellStyles = {
	fontWeight: 'bold',
	fontSize: 16,
	color: 'primary.dark',
};

// sorting should be disabled when searched appointments are being shown or sorting is disabled for a particular column

function TableHeadComponent(props) {
	const { columns, sortBy, sortDirection, handleClickSort, searchedAppointments } = props;
	return (
		<TableHead sx={{ backgroundColor: `${indigo[100]}` }}>
			<TableRow>
				{columns.map(column => {
					if (searchedAppointments.length > 0 || column.sortingIsDisabled) {
						return (
							<TableCell key={column.name} sx={tableCellStyles}>
								{column.label}
							</TableCell>
						);
					}
					return (
						<TableCell key={column.name} sx={tableCellStyles}>
							<TableSortLabel
								active={column.name === sortBy}
								direction={column.name === sortBy ? sortDirection : 'asc'}
								onClick={() => handleClickSort(column)}
							>
								{column.label}
							</TableSortLabel>
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
}

export default TableHeadComponent;
