/**
 * Star Wars (Encyclopedia) API service
 *
 * <https://swapi.thehiveresistance.com/api>
 */
import axios from 'axios'
import { 
	SW_FilmsResponse, 
	SW_PeopleResponse, 
	SW_PlanetsResponse, 
	SW_SpeciesResponse, 
	SW_StarshipsResponse, 
	SW_VehiclesResponse 
} from '../types'

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://swapi.thehiveresistance.com/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	}
})

/**
 * GET request to an endpoint
 *
 * @param {string} endpoint Endpoint to GET
 * @returns Promise
 */
export const get = async <T>(endpoint: string) => {
	const response = await instance.get(endpoint)
	await new Promise(r => setTimeout(r, 1500))
	return response.data as T
}

/**
 * GET request to an endpoint BY PAGE
 * Example: https://swapi.thehiveresistance.com/api/people?page=2
 * 
 * @param {string} endpoint Endpoint to GET
 * @param {number} page Pagenumber to GET
 * @returns Promise
 */
export const getResourcesByPage = async <T>(endpoint: string, page = 1) => {
	const response = await instance.get(`${endpoint}?page=${page}`)
	await new Promise(r => setTimeout(r, 1500))
	return response.data as T
}

/**
 * GET request to an endpoint with id
 * Example: https://swapi.thehiveresistance.com/api/people/1
 * 
 * @param {string} endpoint Endpoint to GET
 * @param {number} resource_id Resource ID to GET
 * @returns Promise
 */
export const getResourceById = async <T>(endpoint: string, resource_id: number) => {
	await new Promise(r => setTimeout(r, 1500))
	return get<T>(`${endpoint}/${resource_id}`)
}

/**
 * Search SW Films
 * Example: https://swapi.thehiveresistance.com/api/people/?search=jedi
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchFilms = async (query: string, page = 1) => {
	await new Promise(r => setTimeout(r, 1500))
	return get<SW_FilmsResponse>(`films/?search=${query}&page=${page}`)
}

/**
 * Search SW People
 * Example: https://swapi.thehiveresistance.com/api/people?search=boba
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchPeople = async (query: string, page = 1) => {
	await new Promise(r => setTimeout(r, 1500))
	return get<SW_PeopleResponse>(`people/?search=${query}&page=${page}`)
}

/**
 * Search SW Planets
 * Example: https://swapi.thehiveresistance.com/api/planets?search=da
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchPlanets = async (query: string, page = 1) => {
	await new Promise(r => setTimeout(r, 1500))
	return get<SW_PlanetsResponse>(`planets/?search=${query}&page=${page}`)
}

/**
 * Search SW Species
 * Example: 
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchSpecies = async (query: string, page = 1) => {
	await new Promise(r => setTimeout(r, 1500))
	return get<SW_SpeciesResponse>(`species/?search=${query}&page=${page}`)
}

/**
 * Search SW Starships
 * Example: 
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchStarships = async (query: string, page = 1) => {
	await new Promise(r => setTimeout(r, 1500))
	return get<SW_StarshipsResponse>(`starships/?search=${query}&page=${page}`)
}

/**
 * Search SW Vehicles
 * Example: 
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchVehicles = async (query: string, page = 1) => {
	await new Promise(r => setTimeout(r, 1500))
	return get<SW_VehiclesResponse>(`vehicles/?search=${query}&page=${page}`)
}