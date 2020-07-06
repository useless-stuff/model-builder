import { Algorithm } from 'jsonwebtoken'
import * as Joi from '@hapi/joi'

export interface IServiceLocator {
    register(service: IService, serviceKey: AVAILABLE_SERVICES, cache: boolean): void

    get<T extends IService>(service: AVAILABLE_SERVICES): T
}

export interface IService {
    serviceName: string
}

export enum AVAILABLE_SERVICES {
    JWT = 'JWT',
    MONGODB = 'MONGODB',
}

export interface IMongoDBCollection {
    collectionName: string

    init(): Promise<IMongoDBCollection>
}

export enum MONGO_DB_COLLECTION {
    USERS = 'users',
    MODELS = 'models'
}

export enum HTTP_METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export enum ENDPOINT {
    USERS = 'users',
    AUTH = 'auth'
}

export interface IRouteConfig {
    cors: boolean
    auth?: string
    validate?: {
        payload?: Joi.Schema
        params?: Joi.Schema
    }
}

export interface IRouteOptions {
    cors?: boolean
    isPrivate?: boolean
    validate?: {
        payload?: Joi.Schema
        params?: Joi.Schema
        query?: Joi.Schema
    }
}

export enum AUTH {
    DEFAULT_SCHEMA = 'default_schema',
    DEFAULT_STRATEGY = 'default_strategy',
}

export enum USER_ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN'
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

export interface IJwtSignOptions {
    subject: string
    expiresIn: string
    issuer: string
    audience: string
    algorithm: Algorithm
}

export interface IJwtPayload {
    iat: number
    exp: number
    aud: string
    iss: string
    sub: string
    role: USER_ROLE
    permission: string
    id: string
}

export interface ILogRow {
    eta: Date
    level: string
    message: string
    processId?: string
    service: string
    id: string
}
