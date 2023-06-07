import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SW_Planet } from '../types'
import { getResourceById } from '../services/StarWarsAPI'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

const PlanetPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Planet|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getFilm = async (id: number) => {
		setLoading(true)

        try {
            const data = await getResourceById<SW_Planet|null>('/planets', id)
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
                                    className="mb-3"
                                >
                                    <p className=""><strong>Climate:</strong> {resource.climate}</p>
                                    <p className=""><strong>Gravity:</strong> {resource.gravity}</p>
                                    <p className=""><strong>Population</strong> {resource.population}</p>
                                    <p className=""><strong>Terrain:</strong> {resource.terrain}</p>
                                    <ListGroup className="mb-3">
                                    <p><strong>Films:</strong></p>
                                    {resource.films.map(data => (
                                        <ListGroup.Item
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
                                    <p><strong>Residents:</strong></p>
                                    {resource.residents.map(data => (
                                        <ListGroup.Item
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

export default PlanetPage