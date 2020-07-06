import { Server } from '@hapi/hapi'

export function configureHooks(server: Server): void {
    server.ext('onPreResponse', (request: any, h) => {
        const isValid = request.response?.statusCode === 200 || request.response?.statusCode === 204
        if (isValid) {
            return h.response({
                data: request.response.source,
                isValid,
            })
        }
        if (request.response?.isBoom) {
            return h
                .response({
                    statusCode: request.response.output.statusCode,
                    message: `${request.response.output.payload.error} : ${request.response.output.payload.message}`,
                    isValid,
                })
                .code(request.response.output.statusCode)
        }
        return {
            isValid,
            message: 'Unhandled boom error in configureHooks',
        }
    })
}
