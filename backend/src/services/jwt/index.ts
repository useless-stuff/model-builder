import * as Jwt from 'jsonwebtoken'
import * as fs from 'fs'
import { IJwtSignOptions, IService } from '../../types'


export class JwtService implements IService {
    public serviceName = 'JwtService'
    protected privateKey: Buffer
    protected publicKey: Buffer

    protected constructor(protected readonly privateKeyPath: string, protected readonly publicKeyPath: string) {
        if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
            throw new Error('Jwt service: private or public key not found')
        }
        this.privateKey = fs.readFileSync(privateKeyPath)
        this.publicKey = fs.readFileSync(publicKeyPath)
    }

    public static getSignOptions(options?: Partial<IJwtSignOptions>): IJwtSignOptions {
        const defaultValues = {
            subject: 'ModelBuilder',
            expiresIn: '24h',
            issuer: 'ModelBuilder Auth Service',
            audience: 'https://model-builder.production/',
            algorithm: 'RS256' as Jwt.Algorithm,
        }
        return { ...defaultValues, ...options }
    }

    public static factory(privateKeyPath: string, publicKeyPath: string): JwtService {
        return new this(privateKeyPath, publicKeyPath)
    }

    public signPayload(payload: object, options: IJwtSignOptions): string {
        return Jwt.sign(payload, this.privateKey, options)
    }

    public decodeToken<T>(token: string): T {
        const newToken = this.cleanupToken(token)
        return Jwt.decode(newToken) as T
    }

    public verifyToken<T>(token: string, options: IJwtSignOptions): T {
        const newToken = this.cleanupToken(token)
        return (Jwt.verify(newToken, this.publicKey, options) as unknown) as T
    }

    protected cleanupToken(token: string): string {
        if (token.includes('Bearer ')) {
            return token.replace('Bearer ', '')
        }
        return token
    }
}
