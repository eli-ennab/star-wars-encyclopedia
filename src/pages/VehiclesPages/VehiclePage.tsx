import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SW_Vehicle } from '../../types'
import { getResourceById } from '../../services/StarWarsAPI'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

const VehiclePage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Vehicle|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getVehicle = async (id: number) => {
		setLoading(true)

        try {
            const data = await getResourceById<SW_Vehicle|null>('/vehicles', id)
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
        getVehicle(resourceId);
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
                                    <p className=""><strong>Crew:</strong> {resource.crew}</p>
                                    <p className=""><strong>Manufacturer:</strong> {resource.manufacturer}</p>
                                    <p className=""><strong>Model:</strong> {resource.model}</p>
                                    <p className=""><strong>Consumables:</strong> {resource.consumables}</p>
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
                                    <p><strong>People:</strong></p>
                                    {resource.pilots.map(data => (
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

export default VehiclePage