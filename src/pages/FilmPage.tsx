import { useNavigate, useLocation } from "react-router-dom";

const FilmPage = () => {
    const location = useLocation()
    return (
        <>
            <h1>{location?.state.message}</h1>
        </>
    )
}

export default FilmPage
