import './bootstrap'
import { locator } from './locator'
import * as Hapi from '@hapi/hapi'
import { MongoDBService } from './services/mongodb'
import { AVAILABLE_SERVICES } from './types'
import { configureAuthorizer } from './hapi/auth/inde'
import { createUser } from './apis/users/create'
import { configureHooks } from './hapi/hooks'
import { routesSettings as routes } from './hapi/router'
import { createAuth } from './apis/auth/create'
import { readUser } from './apis/users/read'
import { configureLogger } from './hapi/logger'

const port = process.env.NODE_SERVICE_PORT || 3000

export async function init(): Promise<Hapi.Server> {
    await locator.get<MongoDBService>(AVAILABLE_SERVICES.MONGODB).connect()
    const server = new Hapi.Server({ port, routes })
    configureLogger(server)
    configureAuthorizer(server)
    configureHooks(server)
    server.route(createUser)
    server.route(readUser)
    server.route(createAuth)
    await server.start()
    return server
}

init()
    .then((server) => console.log([ 'info' ], `Web server started at port: ${port}`))
    .catch((error) => console.log(`Fatal error: ${error}`))
