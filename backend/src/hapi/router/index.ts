import { AUTH, IRouteConfig, IRouteOptions } from '../../types'
import * as Boom from '@hapi/boom'
import * as Joi from '@hapi/joi'

export function setRouteOptions(options: IRouteOptions): IRouteConfig {
    const defaultOptions = {
        cors: true,
        isPrivate: true,
    }
    const mergedOptions = { ...defaultOptions, ...options }
    const routeConfig: IRouteConfig = {
        validate: mergedOptions.validate,
        cors: mergedOptions.cors,
    }
    if (mergedOptions.isPrivate) {
        routeConfig.auth = AUTH.DEFAULT_STRATEGY
    }
    return routeConfig
}

export const routesSettings = {
    validate: {
        failAction: async (request: Request, response: Response, error: Error) => {
            if (process.env.NODE_ENV === 'production') {
                // In prod, log a limited error message and throw the default Bad Request error.
                throw Boom.badRequest(`Invalid request payload input`)
            } else {
                // During development, log and respond with the full error.
                throw error
            }
        },
    },
}

export function validatePathId(): Joi.Schema {
    return Joi.object({
        id: Joi.string().uuid(),
    })
}
