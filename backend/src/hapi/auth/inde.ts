import { Lifecycle, Request, Server, ServerAuthSchemeObject } from '@hapi/hapi'
import * as Boom from '@hapi/boom'
import { JwtService } from '../../services/jwt'
import { AUTH, AVAILABLE_SERVICES, IJwtPayload } from '../../types'
import { locator } from '../../locator'

function defaultSchema(): ServerAuthSchemeObject {
    return {
        authenticate: (r: Request, h): Lifecycle.ReturnValue => {
            try {
                const token = r.headers?.authorization
                if (!token) {
                    throw new Error('This endpoint requires a valid token. Empty token provided')
                }
                const jwt = locator.get<JwtService>(AVAILABLE_SERVICES.JWT)
                const validToken = jwt.verifyToken<IJwtPayload>(token, JwtService.getSignOptions())
                const { role, id } = validToken
                return h.authenticated({
                    credentials: {
                        user: { id,role },
                    },
                })
            } catch (e) {
                throw Boom.unauthorized(`Auth exception: ${e.message}`)
            }
        },
    }
}

export function configureAuthorizer(server: Server): void {
    server.auth.scheme(AUTH.DEFAULT_SCHEMA, defaultSchema)
    server.auth.strategy(AUTH.DEFAULT_STRATEGY, AUTH.DEFAULT_SCHEMA)
}
