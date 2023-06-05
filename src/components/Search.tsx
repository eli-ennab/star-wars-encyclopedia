import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface IProps {
    value: string
    onChange: (e: any) => void
    onSubmit: (e: React.FormEvent) => void
}

const Search: React.FC<IProps> = ( { value, onChange, onSubmit } ) => {
    return (
        <>
            <Form className="mb-4" onSubmit={onSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Film</Form.Label>
					<Form.Control
						onChange={onChange}
						placeholder="Enter your search"
						required
						type="text"
						value={value}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="light"
						type="submit"
						disabled={!value.trim().length}
					>Search</Button>
				</div>
			</Form>
        </>
    )
}

export default Search

