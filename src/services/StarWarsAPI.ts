/**
 * Star Wars (Encyclopedia) API service
 *
 * <https://swapi.thehiveresistance.com/api>
 */
import axios from 'axios'
import { SW_FilmsResponse, SW_PeopleResponse } from '../types'

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
	return response.data as T
}

/**
 * GET request to an endpoint with id
 *
 * @param {string} endpoint Endpoint to GET
 * @param {number} resource_id Resource ID to GET
 * @returns Promise
 */
export const getResource = async <T>(endpoint: string, resource_id: number) => {
	return get<T>(`${endpoint}/${resource_id}`)
}

/**
 * Search SW Films
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchFilms = async (query: string, page = 1) => {
	return get<SW_FilmsResponse>(`films/?search=${query}`)
}

/**
 * Search SW People
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchPeople = async (query: string, page = 1) => {
	return get<SW_PeopleResponse>(`people/?search=${query}`)
}