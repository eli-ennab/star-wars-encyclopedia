import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getResourcesByPage, searchPeople } from '../../services/StarWarsAPI'
import { SW_PeopleResponse } from '../../types'
import LoadingSpinner from '../../components/LoadingSpinner'
import Pagination from '../../components/Pagination'
import Search from '../../components/Search'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const PeoplePage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [resource, setResource] = useState<SW_PeopleResponse|null>(null)
	const [page, setPage] = useState(1)
	const [searchInput, setSearchInput] = useState("")
	const [searchResult, setSearchResult] = useState<SW_PeopleResponse|null>(null)
	const [searchParams, setSearchParams] = useSearchParams("")
	const navigate = useNavigate()
	const query = searchParams.get('search') as string
	// const paramPage = searchParams.get('page') as string

	const getPeople = async (_endpoint: string, currentPage = 1) => {
		setError(null)
		setLoading(true)
		setResource(null)
		
		try {
			const data = await getResourcesByPage<SW_PeopleResponse|null>('/people', currentPage)
			setResource(data)

			if(!searchInput) {
				setSearchParams(`?page=${data?.current_page}`)
			}
			
		} catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const searchSWPeople = async (searchQuery: string) => {
		setError(null)
		setLoading(true)
		setSearchResult(null)

		try {
			const data = await searchPeople(searchQuery)
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

		searchSWPeople(searchInput)
	}


	useEffect(() => {
		if (!query) {
			setSearchInput("")
			setSearchParams("")
			getPeople(query, page)
		}

		if (query !== null) {
			searchSWPeople(query)
		}
	}, [query, page])

	return (
		<>
			<h1><span className="header-title">Star Wars /</span> <span className="category-title">People</span></h1>

            { error && <Alert variant="warning">{error}</Alert>}

			{ loading && <LoadingSpinner /> }

			{ !loading && 
				<Search
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					onSubmit={handleSubmit}
				/>
			}

			{ !loading && searchInput.length > 0 && searchResult && (
				<div id="search-result">
					{searchResult.data.length > 0 ? <p>There are {searchResult.data.length} search results for "{query}"</p> : <p>No data found.</p>}
					
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
											onClick={() => { navigate(`/people/${data.id}`, { state: { message: `${data.name}` } })}}
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

			<hr></hr>

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
											navigate(`/people/${data.id}`, { state: { message: `${data.name}` } });
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

export default PeoplePage
