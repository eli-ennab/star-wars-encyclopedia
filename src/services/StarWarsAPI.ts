/**
 * Star Wars (Encyclopedia) API service
 *
 * <https://swapi.thehiveresistance.com/api>
 */
import axios from 'axios'

const BASE_URL = 'https://swapi.thehiveresistance.com'
const films = '/films'

/**
 * GET all films
*/
const getFilms = async <T>(endpoint: string) => {
	const response = await axios.get(`${BASE_URL}${films}`)
	return response.data as T
}

/**
 * Get a single film
 *
 * @param film_id Film ID
 */
export const getFilm = async <T>(film_id: number) => {
	const res = await axios.get(`${BASE_URL}${films}/${film_id}`)
	return res.data as T
}