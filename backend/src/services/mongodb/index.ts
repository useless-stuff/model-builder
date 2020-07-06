import { MongoClient } from 'mongodb'
import { IMongoDBCollection, IService, MONGO_DB_COLLECTION } from '../../types'

export class MongoDBService implements IService {
    public serviceName = 'MongoDBService'
    protected client: MongoClient = null
    private registeredCollections: { (client: MongoClient): IMongoDBCollection } [] = []
    private collections: IMongoDBCollection[] = []

    protected constructor(protected connectionString: string, protected appName: string) {
    }

    public static factory(connectionString: string, appName: string): MongoDBService {
        return new this(connectionString, appName)
    }

    public async connect(): Promise<MongoDBService> {
        if (this.client) {
            return this
        }

        // Create a new connection
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            appname: this.appName,
        }
        this.client = await MongoClient.connect(this.connectionString, options)
            .catch((error) => {
                throw new Error(`MongoDB connection error: - ${JSON.stringify(error)} -`)
            })

        // Init all registered collections
        await Promise.all(this.registeredCollections.map(collection =>
            collection(this.client).init().then(collection => this.collections.push(collection))),
        )

    }

    public getClient(): MongoClient {
        if (!this.client) {
            throw Error('Connection is not created yet')
        }
        return this.client
    }

    public registerCollection(collection: (client: MongoClient) => IMongoDBCollection): void {
        this.registeredCollections.push(collection)
    }

    public getCollection<T extends IMongoDBCollection>(name: MONGO_DB_COLLECTION): T {
        const collection = this.collections.find(collection => collection.collectionName == name)
        if (!collection) {
            throw new TypeError(`Collection - ${name} - is not registered`)
        }
        return collection as T
    }

}
