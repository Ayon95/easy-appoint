import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React from 'react';

const tableCellStyles = {
	fontWeight: 'bold',
	fontSize: 16,
	color: 'primary.dark',
};

function TableHeadComponent({ columns, sortBy, sortDirection, handleClickSort }) {
	return (
		<TableHead sx={{ backgroundColor: `${indigo[100]}` }}>
			<TableRow>
				{columns.map(column => {
					return column.sortingIsDisabled ? (
						<TableCell key={column.name} sx={tableCellStyles}>
							{column.label}
						</TableCell>
					) : (
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
