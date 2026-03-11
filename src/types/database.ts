export interface Profile {
    user_id: string,
    username: string,
    is_admin: boolean,
    followed_series: string
}

export interface Event {
    id: string,
    name: string,
    start_at: string,
    end_at: string,
    series_id: string,
    timezone: string,
    track: string
}

export interface Series {
    id: string,
    name: string,
    events: Event[],
    next_event: null,
    description: string,
    followed_at: Date,
}
