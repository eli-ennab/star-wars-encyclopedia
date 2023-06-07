import { useNavigate, useLocation } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SW_Person } from '../types'
import { getResourceById, searchFilms } from '../services/StarWarsAPI'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

const PersonPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Person|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getPerson = async (id: number) => {
        setLoading(true)

        try {
            const data = await getResourceById<SW_Person|null>('/people', id)
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
        getPerson(resourceId);
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
                                    <p className=""><strong>Birthyear:</strong> {resource.birth_year}</p>
                                    <p className=""><strong>Created:</strong> {resource.created}</p>
                                    <p className=""><strong>Edited:</strong> {resource.edited}</p>
                                    <p className=""><strong>Mass:</strong> {resource.mass}</p>
                                    <p className=""><strong>Skincolor:</strong> {resource.skin_color}</p>
                                    <p className=""><strong>Eyecolor:</strong> {resource.eye_color}</p>
                                    <p className=""><strong>Haircolor:</strong> {resource.hair_color}</p>
                                    <p className=""><strong>Height:</strong> {resource.height}</p>
                                    {/* <p className=""><strong>Homeworld:</strong> {resource.homeworld}</p> */}
                                    <p><strong>Films:</strong></p>
                                    <ListGroup className="mb-3">
                                        {resource.films.map(data => (
                                            <ListGroup.Item
                                                // action
                                                // href={searchResult.first_page_url}
                                                key={data.id}
                                            >
                                                <h2 className="h3">{data.title}</h2>
                                                <Button
                                                    className="my-3"
                                                    variant="dark"
                                                    onClick={() => { navigate(`/films/${data.id}`, { state: { message: `${data.title}` } })}}
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

export default PersonPage
