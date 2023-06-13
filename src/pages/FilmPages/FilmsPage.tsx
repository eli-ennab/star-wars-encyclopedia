import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getResourcesByPage, searchFilms } from '../../services/StarWarsAPI'
import { SW_FilmsResponse } from '../../types'
import LoadingSpinner from '../../components/LoadingSpinner'
import Pagination from '../../components/Pagination'
import Search from '../../components/Search'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const FilmsPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const [searchInput, setSearchInput] = useState("")
	const [result, setResult] = useState<SW_FilmsResponse|null>(null)
	const [searchParams, setSearchParams] = useSearchParams("")
	const navigate = useNavigate()
	const paramSearch = searchParams.get('search') as string
	const paramPage = searchParams.get('page') as string

	const getFilms = async (_endpoint: string) => {
		setError(null)
		setLoading(true)
		setResult(null)
		setSearchInput("")
		
		try {
			const data = await getResourcesByPage<SW_FilmsResponse|null>('/films', Number(paramPage))
			setResult(data)	
		} catch (err: any) {
			setError(err.message)
		}

		setLoading(false)
	}

	const searchSWFilms = async (searchQuery: string) => {
		setError(null)
		setLoading(true)
		setResult(null)

		try {
			const data = await searchFilms(searchQuery, Number(paramPage))
			setResult(data)
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

		setSearchParams( { search: searchInput, page: '1' } )

		searchSWFilms(searchInput)
	}


	useEffect(() => {
		if (!paramSearch) {
			getFilms(paramSearch)
		}

		if (paramSearch !== null) {
			searchSWFilms(paramSearch)
		}
	}, [paramSearch, paramPage])

	return (
		<>
			<h1><span className="header-title">Star Wars /</span> <span className="category-title">Films</span></h1>

            { error && <Alert variant="warning">{error}</Alert>}

			{ loading && <LoadingSpinner /> }

			{ !loading && !error &&
				<Search
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
					onSubmit={handleSubmit}
				/>
			}

			{ !loading && !error && result && (
				<div id="result">
					{result.data.length > 0 && paramSearch ? <p>{result.total} search results for "{paramSearch}"</p> : <p>{result.total} results</p>}
					
					<Row>
						{result.data.map(data => (
							<Col key={data.id} xs={12} md={6} lg={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title>{data.title}</Card.Title>
										<Card.Text>Release date: {data.release_date}</Card.Text>
										<Button
											variant="dark"
											onClick={() => {navigate(`/films/${data.id}`)}}
										>
												Read more
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>

					<Pagination
						page={result.current_page}
						totalPages={result.last_page}
						hasPreviousPage={Number(paramPage) > 1}
						hasNextPage={Number(paramPage) < result.last_page}
						onPreviousPage={() => { paramSearch 
												? setSearchParams(	{ search: paramSearch, page: (Number(paramPage) - 1).toString() }) 
												: setSearchParams( { page: (Number(paramPage) - 1).toString() })
											}
										}
						onNextPage={() => { paramSearch 
											? setSearchParams(	{ search: paramSearch, page: (Number(paramPage) + 1).toString() }) 
											: setSearchParams( { page: (Number(paramPage) + 1).toString() })
										}
									}
						/>
				</div>
			)}

		</>
	)
}

export default FilmsPage
