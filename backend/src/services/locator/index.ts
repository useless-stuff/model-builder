import { AVAILABLE_SERVICES, IService, IServiceLocator } from '../../types'

export class Locator implements IServiceLocator {
    protected readonly services: IService[] = []

    public get<T extends IService>(service: AVAILABLE_SERVICES): T {
        if (!this.services[service]) {
            throw new Error(`Service.Locator - ${service} - Is not registered`)
        }
        return this.services[service]
    }

    public register(service: IService, serviceKey: AVAILABLE_SERVICES): void {
        if (this.services[serviceKey]) {
            throw new Error(`Service.Locator - Duplicated service - ${serviceKey} -`)
        }
        this.services[serviceKey] = service
    }
}
