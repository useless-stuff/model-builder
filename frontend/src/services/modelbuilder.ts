import axios from 'axios'
import { IUser, LOCAL_STORAGE_KEY } from '../types'
//TODO @diego: API_HOST from env
const API_HOST = 'http://localhost:3000'

function authenticatedRequest() {
    //TODO @diego: Token should be read from the store since local storage is slower
    return { headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.USER_JWT)}` } }
}

export function login(email: string, password: string): Promise<string> {
    return axios
        .post(`${API_HOST}/auth`, { email, password })
        .then(({ data: { data } }) => data.token)
}

export function readUser(): Promise<IUser> {
    return axios
        .get(`${API_HOST}/users`, authenticatedRequest())
        .then(({ data: { data } }) => data)
}