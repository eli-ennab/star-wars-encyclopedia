import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SW_Vehicle } from '../../types'
import { getResourceById } from '../../services/StarWarsAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import ReturnButton from '../../components/ReturnButton'

const VehiclePage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Vehicle|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getVehicle = async (id: number) => {
        setError(null)
		setLoading(true)

        try {
            const data = await getResourceById<SW_Vehicle|null>('/vehicles', id)
            setResource(data)
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
            <ReturnButton />

            <h1>{resource?.name}</h1>

            { error && <Alert variant="warning">{error}</Alert>}

            { loading && 
				<Spinner animation="border" role="status" variant="light">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}

            { !loading && resource && (
                <div id="resource">
                    <Row>
                        <Col key={resource.id} xs={12} md={6} lg={12} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Text><strong>Created:</strong> {resource.created}</Card.Text>
                                    <Card.Text><strong>Model:</strong> {resource.model}</Card.Text>   
                                    <Card.Text><strong>Films:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.films.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.title}</p>
                                            <Button
                                                className="my-3"
                                                variant="dark"
                                                onClick={() => {navigate(`/films/${data.id}`)}}
                                            >
                                                    Read more
                                            </Button>
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup>
                                        <Card.Text><strong>Pilots:</strong></Card.Text>  
                                        <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                            {resource.pilots.map(data => (
                                                <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                                <p>{data.name}</p>
                                                <Button
                                                    className="my-3"
                                                    variant="dark"
                                                    onClick={() => {navigate(`/people/${data.id}`)}}
                                                >
                                                        Read more
                                                </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    )
}

export default VehiclePage