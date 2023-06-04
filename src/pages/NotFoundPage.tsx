import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const NotFoundPage = () => {
    const navigate = useNavigate()

    const navigateBack = () => {
		navigate("/")
	}

    return (
        <>
            <h1>404 not found.</h1>

            <Button
                variant="dark"
                className="m-2"
                onClick={() => navigateBack()}
                >
                    Return to home page
            </Button>
        </>
    )
}

export default NotFoundPage
