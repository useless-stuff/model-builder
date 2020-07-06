import { Request } from '@hapi/hapi'
import { AVAILABLE_SERVICES, ENDPOINT, HTTP_METHOD, MONGO_DB_COLLECTION } from '../../types'
import { setRouteOptions } from '../../hapi/router'
import { locator } from '../../locator'
import { MongoDBService } from '../../services/mongodb'
import * as Boom from '@hapi/boom'
import { UserCollection } from '../users/collection'
import { createRequest } from './validation'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '../../services/jwt'

export const createAuth = {
    method: HTTP_METHOD.POST,
    path: `/${ENDPOINT.AUTH}`,
    options: setRouteOptions({ validate: { payload: createRequest }, isPrivate: false }),
    handler,
}

async function handler({ payload }: Request): Promise<{ token: string }> {
    const uc: UserCollection = locator.get<MongoDBService>(AVAILABLE_SERVICES.MONGODB).getCollection(MONGO_DB_COLLECTION.USERS)
    const jwtService = locator.get<JwtService>(AVAILABLE_SERVICES.JWT)
    const user = await uc.findUserBy({ email: payload.email })
    if (!user) {
        throw Boom.unauthorized('Invalid credentials provided')
    }
    const isPasswordValid = await bcrypt.compare(payload.password, user.password)
    if (!isPasswordValid) {
        throw Boom.unauthorized('Invalid credentials provided')
    }
    const token = jwtService.signPayload({ role: user.role, id: user.id }, JwtService.getSignOptions())
    return { token }
}
