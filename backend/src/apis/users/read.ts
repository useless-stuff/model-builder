import { Request } from '@hapi/hapi'
import { ENDPOINT, HTTP_METHOD } from '../../types'
import { setRouteOptions, validatePathId } from '../../hapi/router'
import { whoIs } from '../../shared/utils'
import * as Boom from '@hapi/boom'
import { UserCollection } from './collection'

export const readUser = {
    method: HTTP_METHOD.GET,
    path: `/${ENDPOINT.USERS}/{id?}`,
    options: setRouteOptions({ validate: { params: validatePathId() } }),
    handler,
}

async function handler(request: Request): Promise<any> {
    // This method should handle the id parameter but so far is not used
    return whoIs(request)
        .then(user => UserCollection.removeUserPassword(user))
        .catch(error => Boom.badRequest(error))
}
