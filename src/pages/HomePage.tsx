import { useState } from 'react'
import { FormGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const HomePage = () => {

    // const [error, setError] = useState<string|null>(null)
	// const [loading, setLoading] = useState(false)
	const [searchInput, setSearchInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!searchInput.trim().length) {
			return
		}

		try {
		} catch (err) {
		}
	}

    return (
        <>
            <h1>Welcome to the Star Wars Encyclopedia</h1>

            <p className="mx-4">Search for films, people, planets, species, starships, vehicles</p>

            <Form
                className="mb-4"
                onSubmit={() => {handleSubmit}}
            >
                <Form.Group 
                    className="m-4" 
                    controlId="search"
                    >
                        <Form.Label>
                            Search
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your search query"
                            onChange={e => setSearchInput(e.target.value)}
                            value={searchInput}
                            required
                        />
                </Form.Group>

                <Button
						variant="light"
						size="lg"
						type="submit"
                        className="mx-4" 
						disabled={!searchInput.trim().length}>
							Search
					</Button>
            </Form>
        </>
    )
}

export default HomePage
