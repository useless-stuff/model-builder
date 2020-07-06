const envs = [
    'MONGODB_CONNECTION_STRING',
    'JWT_PRIVATE_KEY',
    'JWT_PUBLIC_KEY',
]

envs.forEach((validEnv: string): void => {
    if (!process.env[validEnv]) {
        throw new Error(`Bootstrap: Environment variable - ${validEnv} - is empty but set as required`)
    }
})
