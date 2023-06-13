import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SW_Person } from '../../types'
import { getResourceById } from '../../services/StarWarsAPI'
import LoadingSpinner from '../../components/LoadingSpinner'
import ReturnButton from '../../components/ReturnButton'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'

const PersonPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState(true)
    const [resource, setResource] = useState<SW_Person|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getPerson = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
            const data = await getResourceById<SW_Person|null>('/people', id)
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
        getPerson(resourceId);
    }, [resourceId])

    return (
        <>
            <ReturnButton />

            <h1>{resource?.name}</h1>

            { error && <Alert variant="warning">{error}</Alert>}

			{ loading && <LoadingSpinner /> }

            { !loading && resource && (
                <div id="resource">
                    <Row>
                        <Col key={resource.id} xs={12} md={6} lg={12} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Text><strong>Birthyear:</strong> {resource.birth_year}</Card.Text>
                                    <Card.Text><strong>Created:</strong> {resource.created}</Card.Text>
                                    <Card.Text><strong>Eyecolor:</strong> {resource.eye_color}</Card.Text>
                                    <Card.Text><strong>Skincolor:</strong> {resource.skin_color}</Card.Text> 
                                    <Card.Text><strong>Height:</strong> {resource.height}</Card.Text>
                                    <Card.Text><strong>Mass:</strong> {resource.mass}</Card.Text>
                                    <Card.Text><strong>Films:</strong></Card.Text>                              
                                    <ListGroup className="mb-3 d-flex flex-row flex-wrap">
                                        {resource.films.map(data => (
                                            <ListGroup.Item key={data.id} className="col-12 col-lg-4">
                                            <p>{data.title}</p>
                                            <Button
                                                variant="dark"
                                                onClick={() => { navigate(`/films/${data.id}`)}}
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

export default PersonPage
