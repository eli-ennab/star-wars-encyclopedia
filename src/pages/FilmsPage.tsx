import { useEffect, useState } from 'react'
import * as React from "react";
import { useNavigate } from "react-router-dom"
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import { get, search } from '../services/StarWarsAPI'
import { SW_FilmsResponse } from '../types'
import Search from '../components/Search'

const FilmsPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [resource, setResource] = useState<SW_FilmsResponse|null>(null)
	const [page, setPage] = useState(1)
	const [searchInput, setSearchInput] = useState("")
	const [searchResult, setSearchResult] = useState<SW_FilmsResponse|null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	// get "search=" from URL Search Params
	const query = searchParams.get('search')

	const getFilms = async () => {
		setError(null)

		try {
			const data = await get<SW_FilmsResponse|null>('/films')
			setResource(data)
			console.log(data)
		} catch (err: any) {
			setError(err.message)
		}
	}

	const searchSWFilms = async (searchQuery: string, searchPage = 1) => {
		setError(null)
		setLoading(true)
		setSearchResult(null)

		try {
			const data = await search(searchQuery, searchPage)
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
		searchSWFilms(searchInput, 1)
	}

	// react to changes in page state
	useEffect(() => {
		if (!query) {
			return
		}
		searchSWFilms(query, page)
	}, [page, query])

	useEffect(() => {
		getFilms()
	}, [])

	return (
		<>
			<h1>Star Wars films</h1>

			<Search
				value={searchInput}
				onChange={e => setSearchInput(e.target.value)}
				onSubmit={handleSubmit}
			/>

			{ error && <Alert variant="secondary">{error}</Alert>}

			{ loading && <p>Loading...</p>}

			{ searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.data.length} search results for "{query}"...</p>

					<ListGroup className="mb-3">
						{searchResult.data.map(data => (
							<ListGroup.Item
								// action
								// href={searchResult.first_page_url}
								key={data.id}
							>
								<h2 className="h3">{data.title}</h2>
								<p className="text-muted small mb-0">
									director: {data.director} 
								</p>
								<Button
									className="my-3"
									variant="dark"
									onClick={() => { navigate(`/films/${data.id}`, { state: { message: `About ${data.title}` } })}}
								>
										Read more
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			)}

			{ !searchInput && resource && (
			<div id="resource">
					<p>All Star Wars films ({resource.data.length})</p>

					<ListGroup className="mb-3">
						{resource?.data.map(data => (
							<ListGroup.Item
								// action
								className="mb-3"
								// href={}
								key={data.id}
							>
								<h2 className="h3">{data.title}</h2>
								<p className="text-muted small mb-0">
									director: {data.director} 
								</p>
								<Button
									className="my-3"
									variant="dark"
									onClick={() => { navigate(`/films/${data.id}`, { state: { message: `About ${data.title}` } })}}
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

export default FilmsPage
