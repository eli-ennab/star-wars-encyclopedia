import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getResourcesByPage, searchSpecies } from '../../services/StarWarsAPI'
import { SW_SpeciesResponse } from '../../types'
import Pagination from '../../components/Pagination'
import Search from '../../components/Search'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

const SpeciesPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(true)
	const [resource, setResource] = useState<SW_SpeciesResponse|null>(null)
	const [page, setPage] = useState(1)
	const [searchInput, setSearchInput] = useState("")
	const [searchResult, setSearchResult] = useState<SW_SpeciesResponse|null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	const query = searchParams.get('search') as string

	const getSpecies = async (endpoint: string, page = 1) => {
		setError(null)
		setLoading(true)
		setResource(null)

		try {
			const data = await getResourcesByPage<SW_SpeciesResponse|null>('/species', page)
			setResource(data)
		} catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const searchSWSpecies = async (searchQuery: string, searchPage = 1) => {
		setError(null)
		setLoading(true)
		setSearchResult(null)

		try {
			const data = await searchSpecies(searchQuery, searchPage)
			setSearchResult(data)
		} catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!searchInput.trim().length) {
			return
		}

		setPage(1)

		setSearchParams( { search: searchInput } )

		searchSWSpecies(searchInput, 1)
	}

	useEffect(() => {
		if (!query) {
			return
		}
		searchSWSpecies(query, page)
	}, [page, query])

	useEffect(() => {
		getSpecies(query, page)
	}, [query, page])

	return (
		<>
			<h1><span className="header-title">Star Wars /</span> <span className="category-title">Species</span></h1>

			{ loading && 
				<Spinner animation="border" role="status" variant="light">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}

			{ !loading && 
				<Search
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					onSubmit={handleSubmit}
				/>
			}

			{ error && <Alert variant="warning">{error}</Alert>}

			{ !loading && searchInput.length > 0 && searchResult && (
				<div id="search-result">
					<p>There are {searchResult.data.length} search results for "{query}"</p>
						<Row>
							{searchResult.data.map(data => (
								<Col key={data.id} xs={12} md={6} lg={4} className="mb-3">
									<Card>
										<Card.Body>
											<Card.Title>{data.name}</Card.Title>
											<Card.Text>{data.created}</Card.Text>
											<Button
												className="my-3"
												variant="dark"
												onClick={() => { navigate(`/species/${data.id}`, { state: { message: `${data.name}` } })}}
											>
													Read more
											</Button>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
				</div>
			)}

			{ !loading && !searchInput && resource && (
			<div id="resource">
					<p>{resource.total} hits</p>
					<Row>
						{resource?.data.map(data => (
							<Col key={data.id} xs={12} md={6} lg={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title>{data.name}</Card.Title>
										<Card.Text>{data.created}</Card.Text>
										<Button
											variant="dark"
											onClick={() => {
											navigate(`/species/${data.id}`, { state: { message: `${data.name}` } });
											}}
										>
											Read more
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>

					<Pagination
						page={resource.current_page}
						totalPages={resource.last_page}
						hasPreviousPage={page > 1}
						hasNextPage={page < resource.last_page}
						onPreviousPage={() => {setPage(prevValue => prevValue - 1)}}
						onNextPage={() => {setPage(prevValue => prevValue + 1)}}
					/>
				</div>
			)}
		</>
	)
}

export default SpeciesPage