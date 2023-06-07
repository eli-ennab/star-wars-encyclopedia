import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { SW_Film } from '../types'
import { getResourceById, searchFilms } from '../services/StarWarsAPI'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

const FilmPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Film|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getFilm = async (id: number) => {
		setLoading(true)

        try {
            const data = await getResourceById<SW_Film|null>('/films', id)
            setResource(data)
            console.log(data)
        } catch (err: any) {
            setError(err.message)
        }

        setLoading(false)
    }
    
    useEffect(() => {
        if (typeof resourceId !== "number") {
            return
        }
        getFilm(resourceId);
    }, [resourceId])

    return (
        <>
            <Button
                className="my-3"
                variant="light"
                onClick={() => { navigate(-1)}}
            >
                    Go back
            </Button>

            <h1>{location?.state.message}</h1>

            { loading && 
				<Spinner animation="border" role="status" variant="light">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}

            { !loading && resource && (
                <div id="resource">
                        <ListGroup className="mb-3">
                                <ListGroup.Item
                                    // action
                                    className="mb-3"
                                    // href={}
                                    // key={}
                                >
                                    <p className=""><strong>Director:</strong> {resource.director}</p>
                                    <p className=""><strong>Producer:</strong> {resource.producer}</p>
                                    <p className=""><strong>Opening crawl:</strong> {resource.opening_crawl}</p>
                                    <p className=""><strong>Release date:</strong> {resource.release_date}</p>
                                    <p><strong>Characters:</strong></p>
                                    <ListGroup className="mb-3">
                                    {resource.characters.map(data => (
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
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
            )}
        </>
    )
}

export default FilmPage
