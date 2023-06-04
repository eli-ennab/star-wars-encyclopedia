import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import './assets/scss/App.scss'

function App() {
    return (
        <div id="App">
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default App
