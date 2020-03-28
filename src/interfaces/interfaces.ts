export interface User {
    username: String,
    login: Boolean,
    password?: String,
    user_id?: Number,
    first_name?: String,
    last_name?: String,
    token?: String,
    is_staff?: Boolean,
    credentials_valid?: Boolean
}

export interface Utils {
    code?: Number | String
}

export interface AppTime {
    id: number,
    value: number,
    text: String
}