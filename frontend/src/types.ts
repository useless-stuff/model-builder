import { RouteComponentProps } from 'react-router'
import { ThunkAction } from '@reduxjs/toolkit'
import { Action } from '@reduxjs/toolkit'

export enum ROUTE {
    LOGIN = '/',
    DASHBOARD = '/dashboard',
}

export interface IPage extends RouteComponentProps {
    isPrivate: boolean
}

export interface IParams {
    id: string
}

export enum ALERT_TYPE {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}

export interface IAlert {
    id?: string
    showed?: boolean
    message: string
    title: string
    severity: ALERT_TYPE
}

export interface IRootStore {
    auth: IAuthStore
    alerts: IAlert[]
}

export interface IRemoteData {
    loading: boolean
    error: null | string
}

export interface IAuthStore extends IRemoteData {
    data: {
        token: string | null
        user: IUser | null
    }
}

export enum LOCAL_STORAGE_KEY {
    USER_JWT = 'USER_JWT',
}

export type IThunk = ThunkAction<void, IRootStore, unknown, Action<string>>

export interface IIdentity {
    email: string
    password: string
}

export interface ITableProps {
    tableClass?: string
    data: ITableData
}

export interface ITableData {
    cols: string[]
    rows: Record<string, any>[]
}

export enum USER_ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IDocument {
    id: string
    createdAt: Date
}

export interface IUser extends IDocument {
    email: string
    password: string
    role: USER_ROLE
}
