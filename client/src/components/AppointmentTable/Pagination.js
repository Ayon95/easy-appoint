import { TablePagination } from '@mui/material';
import React from 'react';
import { useQueryClient } from 'react-query';

function Pagination(props) {
	const { count, page, rowsPerPage, rowsPerPageOptions, setPage, setRowsPerPage } = props;
	const queryClient = useQueryClient();

	// the second argument is the zero-based index of the current page
	function handleChangePage(_, pageIndex) {
		setPage(pageIndex + 1);
		// when the user changes the page, we have to invalidate the appointments query so that it refetches new data
		queryClient.invalidateQueries('appointments');
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(Number.parseFloat(event.target.value));
		// We want to go back to the first page
		/* Let's say, a table has 25 rows in total and currently each page shows 5 rows, so there are 5 pages.
		Suppose we are on the 5th page and we changed rows per page to 25. If we don't go back to the first page,
		then page 5 will simply be empty since now each page is showing 25 rows */
		setPage(1);
		// when the user changes number of rows per page, we have to invalidate the appointments query so that it refetches new data
		queryClient.invalidateQueries('appointments');
	}
	return (
		<TablePagination
			component="div"
			count={count}
			page={page}
			rowsPerPage={rowsPerPage}
			rowsPerPageOptions={rowsPerPageOptions}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
}

export default Pagination;
