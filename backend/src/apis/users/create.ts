import { Request } from '@hapi/hapi'
import { AVAILABLE_SERVICES, ENDPOINT, HTTP_METHOD, IUser, MONGO_DB_COLLECTION } from '../../types'
import { setRouteOptions } from '../../hapi/router'
import { createRequest } from './validation'
import { locator } from '../../locator'
import { MongoDBService } from '../../services/mongodb'
import { UserCollection } from './collection'
import * as Boom from '@hapi/boom'

export const createUser = {
    method: HTTP_METHOD.POST,
    path: `/${ENDPOINT.USERS}`,
    options: setRouteOptions({ validate: { payload: createRequest }, isPrivate: false }),
    handler,
}

async function handler({ payload }: Request): Promise<Partial<IUser> | Boom.Boom> {
    const uc: UserCollection = locator.get<MongoDBService>(AVAILABLE_SERVICES.MONGODB).getCollection(MONGO_DB_COLLECTION.USERS)
    return uc.createUser(payload).catch(error => Boom.badRequest(error))
}
