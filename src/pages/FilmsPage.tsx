import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import { search } from '../services/StarWarsAPI'
import { SW_FilmsResponse } from '../types'
import Search from '../components/Search'

const FilmsPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [searchInput, setSearchInput] = useState("")	// input field
	const [searchResult, setSearchResult] = useState<SW_FilmsResponse|null>(null)	// data that gets back from api
	const [searchParams, setSearchParams] = useSearchParams()	// search query in url *after* /search?

	// get "search=" from URL Search Params
	const query = searchParams.get('search')

	const searchSWFilms = async (searchQuery: string, searchPage = 1) => {
		setError(null)
		setLoading(true)
		setSearchResult(null)

		try {
			const res = await search(searchQuery, searchPage)
			setSearchResult(res)
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

	return (
		<>
			<h1>Star Wars films search</h1>

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
								action
								href={searchResult.first_page_url}
								key={data.id}
							>
								<h2 className="h3">{data.title}</h2>
								<p className="text-muted small mb-0">
									director: {data.director} 
								</p>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			)}
		</>
	)
}

export default FilmsPage
