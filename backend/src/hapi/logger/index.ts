import { ILogRow } from '../../types'
import { LogEvent, Request, Server } from '@hapi/hapi'
import { v4 as uuid } from 'uuid'

export function configureLogger(server: Server): void {
    server.events.on('log', (event: LogEvent, tags: { [p: string]: true }) => {
        const level = Object.keys(tags).join('_')
        let message = event.error instanceof Error && event.error.message
        if (!message) {
            message = typeof event.data === 'object' ? JSON.stringify(event.data) : event.data
        }
        logMessageHandler(createLogRow(message, level))
    })

    server.events.on('request', (request: Request, event: any) => {
        if (event?.error?.output?.statusCode === 404) {
            console.log(`configureLogger: Request 404 - ${JSON.stringify(event?.error?.output)}`)
            return
        }
        const level = event.tags.join('_')
        const message = event.error ? event.error.toString() : JSON.stringify(event.data) || 'No message provided'
        logMessageHandler(createLogRow(message, level))
    })

    process.on('unhandledRejection', (error) => {
        logMessageHandler(createLogRow(`UnhandledRejection error ${error}`, 'error'))
    })
}

function logMessageHandler(logRow: ILogRow): void {
    // This console log is the process' stdout
    console.log(logRow)
}

export function createLogRow(message: string, level: string, processId?: string): ILogRow {
    return {
        id: uuid(),
        service: (global as any).serviceName,
        eta: new Date(),
        message,
        level,
        processId,
    }
}
