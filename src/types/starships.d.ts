export type SW_Starships = {
    id: number
    name: string
    model: string
    starship_class: string
    manufacturer: string
    cost_in_credits: string
    length: string
    crew: string
    passengers: string
    max_atmosphering_speed: string
    hyperdrive_rating: string
    MGLT: string
    cargo_capacity: string
    consumables: string
    created: string
    edited: string
    pilots_count: number
    films_count: number
}

export type SW_StarshipsResponse = {
    current_page: number
    data: SW_Starships[]
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

export type SW_Starship = {
    id: number
    name: string
    model: string
    starship_class: string
    manufacturer: string
    cost_in_credits: string
    length: string
    crew: string
    passengers: string
    max_atmosphering_speed: string
    hyperdrive_rating: string
    MGLT: string
    cargo_capacity: string
    consumables: string
    created: string
    edited: string
    pilots: [{ 
        id: number
        name: string
    }]
    films: [{
        id: number
        title: string
    }]
}