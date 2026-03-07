export interface Profile {
    user_id: string,
    username: string,
    is_admin: boolean,
    followed_series: string
}

export interface Event {
    id: string,
    name: string,
    start_at: Date,
    end_at: Date,
    series_id: string,
    timezone: string
}