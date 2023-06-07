import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getResourcesByPage, searchSpecies } from '../../services/StarWarsAPI'
import { SW_SpeciesResponse } from '../../types'
import Pagination from '../../components/Pagination'
import Search from '../../components/Search'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
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

	// get "search=" from URL Search Params
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

	const searchSWPlanets = async (searchQuery: string, searchPage = 1) => {
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

		// reset page state
		setPage(1)

		// set input value as search in searchParams
		setSearchParams( { search: searchInput } )

		// search
		searchSWPlanets(searchInput, 1)
	}

	// react to changes in page state
	useEffect(() => {
		if (!query) {
			return
		}
		searchSWPlanets(query, page)
	}, [page, query])

	useEffect(() => {
		getSpecies(query, page)
	}, [query, page])

	return (
		<>
			<h1>Star Wars / Species</h1>

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

			{ !loading && error && <Alert variant="secondary">{error}</Alert>}


			{ !loading && searchInput.length > 0 && searchResult && (
				<div id="search-result">
					<p>There are {searchResult.data.length} search results for "{query}"</p>

					<ListGroup className="mb-3">
						{searchResult.data.map(data => (
							<ListGroup.Item
								key={data.id}
							>
								<h2 className="h3">{data.name}</h2>
								<Button
									className="my-3"
									variant="dark"
									onClick={() => { navigate(`/species/${data.id}`, { state: { message: `${data.name}` } })}}
								>
										Read more
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			)}

			{ !loading && !searchInput && resource && (
			<div id="resource">
					<p>{resource.total} hits</p>

					<ListGroup className="mb-3">
						{resource?.data.map(data => (
							<ListGroup.Item
								// action
								className="mb-3"
								// href={}
								key={data.id}
							>
								<h2 className="h3">{data.name}</h2>
								<Button
									className="my-3"
									variant="dark"
									onClick={() => { navigate(`/species/${data.id}`, { state: { message: `${data.name}` } })}}
								>
										Read more
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>

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