export type SW_Films = {
    id: number
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    created: string
    edited: string
    characters_count: number
    planets_count: number
    starships_count: number
    vehicles_count: number
    species_count: number
}

export type SW_FilmsResponse = {
    current_page: number
    data: SW_Films[]
    first_page_url: string
    from: number
    last_page: 1
    last_page_url: string
    links: []
    next_page_url: string|null,
    path: string
    per_page: number
    prev_page_url: string|null
    to: number
    total: number
}

export type SW_Film = {
    id: number
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    created: string
    edited: string
    characters: [
        id: number,
        name: string
    ]
    planets: [
        id: number,
        name: string
    ]
    starships: [
        id: number,
        name: string
    ]
    vehicles: [
        id: number,
        name: string
    ]
    species: [
        id: number,
        name: string
    ]
}