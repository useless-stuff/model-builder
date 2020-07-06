import { MongoClient } from 'mongodb'
import { MONGO_DB_COLLECTION } from '../../types'

export abstract class AbstractCollection {
    protected constructor(protected client: MongoClient, protected collectionName: string, protected schema: object) {
    }

    protected init(): Promise<unknown> {
        return this.client
            .db()
            // Create collection if not exists
            .createCollection(this.collectionName, { validator: this.schema })
            // Update the schema
            .then(() => this.client.db().command({ collMod: this.collectionName, validator: this.schema }))
            .catch(e => {
                throw new Error(`Collection ${this.collectionName} error: - ${e} -`)
            })
    }

    public async create<T>(collection: MONGO_DB_COLLECTION, document: object): Promise<T> {
        const response = await this.client
            .db()
            .collection(collection)
            .insertOne(document)
            .catch((error: Error) => {
                throw new Error(`Create document: - ${error.message} -`)
            })
        if (!Array.isArray(response.ops)) {
            throw new Error('Create document error - response from MongoDB is not valid')
        }
        return this.normaliseId<T>(response.ops[0])
    }

    public async findOne<T>(filter: object, collection: MONGO_DB_COLLECTION): Promise<T | null> {
        const result = await this.client.db().collection(collection).findOne(filter)
        if (!result) {
            return null
        }
        return this.normaliseId<T>(result)
    }

    public normaliseId<T>(input: any): T {
        const { _id: id, ...rest } = input
        return { ...rest, id }
    }
}
