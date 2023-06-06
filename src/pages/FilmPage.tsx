import { useNavigate, useLocation } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SW_Film } from '../types'
import { getResource, search } from '../services/StarWarsAPI'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const FilmPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [resource, setResource] = useState<SW_Film|null>(null)
    const { id } = useParams()
	const resourceId = Number(id)

    const getFilm = async (id: number) => {
        try {
            const data = await getResource<SW_Film|null>('/films', id)
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
        getFilm(resourceId);
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
                                    <p className=""><strong>Director:</strong> {resource.director}</p>
                                    <p className=""><strong>Producer:</strong> {resource.producer}</p>
                                    <p className=""><strong>Opening crawl:</strong> {resource.opening_crawl}</p>
                                    <p className=""><strong>Release date:</strong> {resource.release_date}</p>
                                    {/* <p className=""><strong>Characters:</strong> {resource.characters.map(characters => characters.name)}</p> */}
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

export default FilmPage
