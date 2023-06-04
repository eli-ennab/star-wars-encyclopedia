import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './assets/scss/App.scss'

function App() {
    return (
        <div id="App">
            <Routes>
                  <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    )
}

export default App
