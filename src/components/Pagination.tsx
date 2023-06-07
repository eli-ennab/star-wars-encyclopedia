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
				variant="light"
				disabled={!hasPreviousPage}
				onClick={onPreviousPage}
			>PREVIOUS</Button>
		</div>

		<div className="page"><p className="mb-0">PAGE {page} / {totalPages}</p></div>

		<div className="next">
			<Button
				variant="light"
				disabled={!hasNextPage}
				onClick={onNextPage}
			>NEXT</Button>
		</div>
	</div>
	)
}

export default Pagination
