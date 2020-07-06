import * as fs from 'fs'
import { getEnv } from './shared/utils'
import { MongoDBService } from './services/mongodb'
import { Locator } from './services/locator'
import { AVAILABLE_SERVICES } from './types'
import { UserCollection } from './apis/users/collection'
import { JwtService } from './services/jwt'

const appName = 'model-builder-api'

// MongoDB service
const connectionString = Buffer.from(getEnv('MONGODB_CONNECTION_STRING'), 'base64').toString()
const mongodb = MongoDBService.factory(connectionString, appName)
mongodb.registerCollection((client) => new UserCollection(client))

// JWT service
const privateKeyPath = '/tmp/jwt_private_key'
const publicKeyPath = '/tmp/jwt_public_key'
fs.writeFileSync(privateKeyPath, Buffer.from(getEnv('JWT_PRIVATE_KEY'), 'base64'))
fs.writeFileSync(publicKeyPath, Buffer.from(getEnv('JWT_PUBLIC_KEY'), 'base64'))
const jwt = JwtService.factory(privateKeyPath, publicKeyPath)

export const locator = new Locator()
locator.register(mongodb, AVAILABLE_SERVICES.MONGODB)
locator.register(jwt, AVAILABLE_SERVICES.JWT)

