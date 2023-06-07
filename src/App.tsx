import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FilmPage from './pages/FilmPage'
import FilmsPage from './pages/FilmsPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import PlanetsPage from './pages/PlanetsPage'
import PlanetPage from './pages/PlanetPage'
import NotFoundPage from './pages/NotFoundPage'
import Navigation from './components/Navigation'
import Container from 'react-bootstrap/Container'
import './assets/scss/App.scss'

function App() {
    return (
        <div id="App">

            <Navigation />

            <Container className="py-3">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/films" element={<FilmsPage />} />
                    <Route path="/films/:id" element={<FilmPage />} />
                    <Route path="/people" element={<PeoplePage />} />
                    <Route path="/people/:id" element={<PersonPage />} />
                    <Route path="/planets" element={<PlanetsPage />} />
                    <Route path="/planets/:id" element={<PlanetPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
