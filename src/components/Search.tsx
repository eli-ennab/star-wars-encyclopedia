import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Search = () => {
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

export default Search
