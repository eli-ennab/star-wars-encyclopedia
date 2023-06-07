export type SW_Planets = {
    id: number
    name: Tatooine,
    rotation_period: string
    orbital_period: string
    diameter: number
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
    created: string
    edited: string
    residents_count: number
    films_count: number
}

export type SW_PlanetsResponse = {
    current_page: number
    data: SW_Planets[]
    first_page_url: string
    from: number
    last_page: number
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

export type SW_Planet = {
    id: number
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
    created: string
    edited: string
    residents: [{ 
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
    }]
    films: [{
        id: number
        title: string
    }]
}
