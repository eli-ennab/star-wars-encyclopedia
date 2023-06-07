export type SW_Vehicles = {
    id: number
    name: string
    model: string
    vehicle_class: string
    manufacturer: string
    length: string
    cost_in_credits: string
    crew: string
    passengers: string
    max_atmosphering_speed: string
    cargo_capacity: string
    consumables: string
    created: string
    edited: string
    pilots_count: number
    films_count: number
}

export type SW_VehiclesResponse = {
    current_page: number
    data: SW_Vehicles[]
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

export type SW_Vehicle = {
    id: number
    name: string
    model: string
    vehicle_class: string
    manufacturer: string
    length: string
    cost_in_credits: string
    crew: string
    passengers: string
    max_atmosphering_speed: string
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