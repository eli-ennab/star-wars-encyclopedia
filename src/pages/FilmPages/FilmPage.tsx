import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SW_Film } from '../../types'
import { getResourceById } from '../../services/StarWarsAPI'
import LoadingSpinner from '../../components/LoadingSpinner'
import ReturnButton from '../../components/ReturnButton'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'

const FilmPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Film|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getFilm = async (id: number) => {
        setError(null)
		setLoading(true)

        try {
            const data = await getResourceById<SW_Film|null>('/films', id)
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
        getFilm(resourceId);
    }, [resourceId])

    return (
        <>
            <ReturnButton />

            <h1>{resource?.title}</h1>

            { error && <Alert variant="warning">{error}</Alert>}

			{ loading && <LoadingSpinner /> }

            { !loading && resource && (
                <div id="resource">
                    <Row>
                        <Col key={resource.id} xs={12} md={6} lg={12} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{resource.title}</Card.Title>
                                    <Card.Text><strong>Created:</strong> {resource.created}</Card.Text> 
                                    <Card.Text><strong>Releasedate:</strong> {resource.release_date}</Card.Text>
                                    <Card.Text><strong>Opening crawl:</strong> {resource.opening_crawl}</Card.Text>   
                                    <Card.Text><strong>Characters:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.characters.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.name}</p>
                                            <Button
                                                variant="dark"
                                                onClick={() => { navigate(`/people/${data.id}`)}}
                                            >
                                                    Read more
                                            </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Text><strong>Planets:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.planets.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.name}</p>
                                            <Button
                                                variant="dark"
                                                onClick={() => { navigate(`/planets/${data.id}`)}}
                                            >
                                                    Read more
                                            </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Text><strong>Starships:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.starships.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.name}</p>
                                            <Button
                                                variant="dark"
                                                onClick={() => { navigate(`/starships/${data.id}`)}}
                                            >
                                                    Read more
                                            </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Text><strong>Species:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.species.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.name}</p>
                                            <Button
                                                variant="dark"
                                                onClick={() => { navigate(`/species/${data.id}`)}}
                                            >
                                                    Read more
                                            </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Text><strong>Vehicles:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.vehicles.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.name}</p>
                                            <Button
                                                variant="dark"
                                                onClick={() => { navigate(`/vehicles/${data.id}`)}}
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

export default FilmPage
