import React from 'react'
import Button from 'react-bootstrap/Button'

interface IPaginationProps {
	page: number
	totalPages: number
	hasPreviousPage: boolean
	hasNextPage: boolean
	onPreviousPage: () => void
	onNextPage: () => void
}

const Pagination: React.FC<IPaginationProps> = ({
	page,
	totalPages,
	hasPreviousPage,
	hasNextPage,
	onPreviousPage,
	onNextPage,
}) => {
	return (
		<div className="d-flex justify-content-between align-items-center">
		<div className="prev">
			<Button
				variant="dark"
				disabled={!hasPreviousPage}
				onClick={onPreviousPage}
			>Previous Page</Button>
		</div>

		<div className="page">Page {page}/{totalPages}</div>

		<div className="next">
			<Button
				variant="dark"
				disabled={!hasNextPage}
				onClick={onNextPage}
			>Next Page</Button>
		</div>
	</div>
	)
}

export default Pagination
