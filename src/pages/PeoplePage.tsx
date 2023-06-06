import * as React from "react"
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { get, searchPeople } from '../services/StarWarsAPI'
import { SW_PeopleResponse } from '../types'
import Search from '../components/Search'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

const PeoplePage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [resource, setResource] = useState<SW_PeopleResponse|null>(null)
	const [page, setPage] = useState(1)
	const [searchInput, setSearchInput] = useState("")
	const [searchResult, setSearchResult] = useState<SW_PeopleResponse|null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	// get "search=" from URL Search Params
	const query = searchParams.get('search')

	const getPeople = async () => {
		setError(null)
		setLoading(true)

		try {
			const data = await get<SW_PeopleResponse|null>('/people')
			setResource(data)
			console.log(data)
		} catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const searchSWPeople = async (searchQuery: string, searchPage = 1) => {
		setError(null)
		setLoading(true)
		setSearchResult(null)

		try {
			const data = await searchPeople(searchQuery, searchPage)
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
		searchSWPeople(searchInput, 1)
	}

	// react to changes in page state
	useEffect(() => {
		if (!query) {
			return
		}
		searchSWPeople(query, page)
	}, [page, query])

	useEffect(() => {
		getPeople()
	}, [])

	return (
		<>
			<h1>Star Wars / people</h1>

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

			{ !loading && searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.data.length} search results for "{query}"...</p>

					<ListGroup className="mb-3">
						{searchResult.data.map(data => (
							<ListGroup.Item
								// action
								// href={searchResult.first_page_url}
								key={data.id}
							>
								<h2 className="h3">{data.name}</h2>
								<Button
									className="my-3"
									variant="dark"
									onClick={() => { navigate(`/people/${data.id}`, { state: { message: `${data.name}` } })}}
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
					<p>All Star Wars people ({resource.data.length})</p>

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
									onClick={() => { navigate(`/people/${data.id}`, { state: { message: `${data.name}` } })}}
								>
										Read more
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			)}
		</>
	)
}

export default PeoplePage
