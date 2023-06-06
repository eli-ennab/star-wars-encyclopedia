import { useNavigate, useLocation } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SW_Person } from '../types'
import { getResource, searchFilms } from '../services/StarWarsAPI'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const PersonPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [resource, setResource] = useState<SW_Person|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getPerson = async (id: number) => {
        try {
            const data = await getResource<SW_Person|null>('/people', id)
            setResource(data)
            console.log(data)
        } catch (err: any) {
            setError(err.message)
        }
    }
    
    useEffect(() => {
        if (typeof resourceId !== "number") {
            return
        }
        getPerson(resourceId);
    }, [resourceId])

    return (
        <>
            <h1>{location?.state.message}</h1>

            { resource && (
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
                                    <Button
                                        className="my-3"
                                        variant="dark"
                                        onClick={() => { navigate(-1)}}
                                    >
                                            Go back
                                    </Button>
                                </ListGroup.Item>
                        </ListGroup>
                    </div>
            )}
        </>
    )
}

export default PersonPage
