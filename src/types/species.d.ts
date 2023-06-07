export type SW_Species = {
    id: number
    name: string
    classification: string
    designation: string
    average_height: string
    average_lifespan: string
    eye_colors: string
    hair_colors: string
    skin_colors: string
    language: string
    created: string
    edited: string
    people_count: number
    films_count: number
    homeworld: {
        id: number
        name: string
    }
}

export type SW_SpeciesResponse = {
    current_page: number
    data: SW_Species[]
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

export type SW_Specie = {
    id: number
    name: string
    classification: string
    designation: string
    average_height: string
    average_lifespan: string
    eye_colors: string
    hair_colors: string
    skin_colors: string
    language: string
    created: string
    edited: string
    people: [{ 
        id: number
        name: string
    }]
    homeworld: [{ 
        id: number
        name: string
    }]
    films: [{
        id: number
        title: string
    }]
}