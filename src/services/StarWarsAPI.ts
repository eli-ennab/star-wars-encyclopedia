/**
 * Star Wars (Encyclopedia) API service
 *
 * <https://swapi.thehiveresistance.com/api>
 */
import axios from 'axios'
import { SW_FilmsResponse } from '../types'

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
 * Execute a HTTP GET request to an endpoint
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get(endpoint)
	return response.data as T
}

/**
 * Search SW Films
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const search = async (query: string, page = 1) => {
	return get<SW_FilmsResponse>(`films/?search=${query}`)
}