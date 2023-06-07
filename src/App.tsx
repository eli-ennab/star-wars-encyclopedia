import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FilmPage from './pages/FilmPages/FilmPage'
import FilmsPage from './pages/FilmPages/FilmsPage'
import PeoplePage from './pages/PeoplePages/PeoplePage'
import PersonPage from './pages/PeoplePages/PersonPage'
import PlanetsPage from './pages/PlanetPages/PlanetsPage'
import PlanetPage from './pages/PlanetPages/PlanetPage'
import SpeciesPage from './pages/SpeciesPages/SpeciesPage'
import SpeciePage from './pages/SpeciesPages/SpeciePage'
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
                    <Route path="/species" element={<SpeciesPage />} />
                    <Route path="/species/:id" element={<SpeciePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
