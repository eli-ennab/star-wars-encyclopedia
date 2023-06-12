import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SW_Starship } from '../../types'
import { getResourceById } from '../../services/StarWarsAPI'
import LoadingSpinner from '../../components/LoadingSpinner'
import ReturnButton from '../../components/ReturnButton'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'

const StarshipPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Starship|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getStarship = async (id: number) => {
        setError(null)
		setLoading(true)

        try {
            const data = await getResourceById<SW_Starship|null>('/starships', id)
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
        getStarship(resourceId);
    }, [resourceId])

    return (
        <>
            <ReturnButton />

            <h1>{location?.state.message}</h1>

            { error && <Alert variant="warning">{error}</Alert>}

			{ loading && <LoadingSpinner /> }

            { !loading && resource && (
                <div id="resource">
                    <Row>
                        <Col key={resource.id} xs={12} md={6} lg={12} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{resource.name}</Card.Title>
                                    <Card.Text><strong>Created:</strong> {resource.created}</Card.Text>
                                    <Card.Text><strong>Crew:</strong> {resource.crew}</Card.Text>
                                    <Card.Text><strong>Manufacturer:</strong> {resource.manufacturer}</Card.Text> 
                                    <Card.Text><strong>Model:</strong> {resource.model}</Card.Text>
                                    <Card.Text><strong>Films:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.films.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.title}</p>
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
                                        <Card.Text><strong>Pilots:</strong></Card.Text>  
                                        <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                            {resource.pilots.map(data => (
                                                <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                                <p>{data.name}</p>
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    )
}

export default StarshipPage