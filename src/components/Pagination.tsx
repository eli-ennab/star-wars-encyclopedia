import React from 'react'
import Button from 'react-bootstrap/Button'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'

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
			><TfiAngleLeft /></Button>
		</div>

		<div className="page"><p className="mb-0">PAGE {page} / {totalPages}</p></div>

		<div className="next">
			<Button
				variant="dark"
				disabled={!hasNextPage}
				onClick={onNextPage}
			><TfiAngleRight /></Button>
		</div>
	</div>
	)
}

export default Pagination
