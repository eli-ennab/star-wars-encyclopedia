export type SW_People = {
    id: number
    name: string
    birth_year: string
    eye_color: string
    hair_color: string
    height: string
    mass: string
    skin_color: string
    created: string
    edited: number
    films_count: number
    species_count: number
    starships_count: number
    vehicles_count: number
    homeworld: {
        id: name
        name: string
    }
}

export type SW_PeopleResponse = {
    current_page: number
    data: SW_People[]
    first_page_url: string
    from: number
    last_page: 1
    last_page_url: string
    links: [
        url: string|null,
        label: string,
        active: boolean
    ]
    next_page_url: string|null,
    path: string
    per_page: number
    prev_page_url: string|null
    to: number
    total: number
}

export type SW_Person = {
    id: number
    name: string
    birth_year: string
    eye_color: string
    hair_color: string
    height: string
    mass: string
    skin_color: string
    created: string
    edited: number
    homeworld: {
        id: number,
        name: string
    }
    films: [
        id: number,
        name: string
    ]
    species: [
        id?: number,
        name?: string
    ]
    starships: [
        id: number,
        name: string
    ]
    vehicles: [
        id: number,
        name: string
    ]
}