import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { TfiAngleLeft } from 'react-icons/tfi'

const ReturnButton = () => {
    const navigate = useNavigate()
    return (
        <Button
        className="my-3"
        variant="dark"
        onClick={() => { navigate(-1)}}
    >
            <TfiAngleLeft />
    </Button>
    )
}

export default ReturnButton
