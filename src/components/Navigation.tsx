import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

const Navigation = () => {
	return (
			<Navbar variant="dark" expand="md">
				<Container>
					<Navbar.Brand as={Link} to="/" className="navbar-header">Star Wars Encyclopedia</Navbar.Brand>
					<Navbar.Brand as={Link} to="https://github.com/eli-ennab" target="_blank" className="px-2"><FaGithub /></Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={NavLink} end to="/films?page=1">Films</Nav.Link>
							<Nav.Link as={NavLink} end to="/people?page=1">People</Nav.Link>
							<Nav.Link as={NavLink} end to="/planets?page=1">Planets</Nav.Link>
							<Nav.Link as={NavLink} end to="/species?page=1">Species</Nav.Link>
							<Nav.Link as={NavLink} end to="/starships?page=1">Starships</Nav.Link>
							<Nav.Link as={NavLink} end to="/vehicles?page=1">Vehicles</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
	)
}

export default Navigation