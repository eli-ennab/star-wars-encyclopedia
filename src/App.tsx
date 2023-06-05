import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FilmsPage from './pages/FilmsPage'
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
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
