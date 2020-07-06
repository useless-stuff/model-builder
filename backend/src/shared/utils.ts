import * as Boom from '@hapi/boom'
import { Request } from '@hapi/hapi'
import { AVAILABLE_SERVICES, IUser, MONGO_DB_COLLECTION } from '../types'
import { locator } from '../locator'
import { MongoDBService } from '../services/mongodb'
import { UserCollection } from '../apis/users/collection'

export function getEnv(envKey: string): string {
    const env = process.env[envKey]
    if (!env) {
        throw new Error(`GetEnv: - ${envKey} - is not set`)
    }
    return env
}

export async function whoIs(request: Request): Promise<Partial<IUser>> {
    const { auth } = request
    if (!auth.isAuthenticated) {
        throw Boom.unauthorized(`WhoIs: user not logged`)
    }
    const { id: userId } = auth.credentials.user as { id: string, role: string }
    const uc: UserCollection = locator.get<MongoDBService>(AVAILABLE_SERVICES.MONGODB).getCollection(MONGO_DB_COLLECTION.USERS)
    const user = await uc.findUserBy({ _id: userId })
    if (!user) {
        throw Boom.unauthorized(`WhoIs: user not found`)
    }
    return user
}
