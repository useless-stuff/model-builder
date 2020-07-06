import { AbstractCollection } from '../../services/mongodb/collection'
import { MongoClient } from 'mongodb'
import { IMongoDBCollection, MONGO_DB_COLLECTION } from '../../types'

export const schema = {
    $jsonSchema: {
        properties: {
            type: {
                type: 'string',
                description: 'Model type',
            },
        },
    },
}

export class ModelCollection extends AbstractCollection implements IMongoDBCollection {
    public collectionName = MONGO_DB_COLLECTION.MODELS

    constructor(client: MongoClient) {
        super(client, MONGO_DB_COLLECTION.USERS, schema)
    }

    public init(): Promise<ModelCollection> {
        return super.init()
            .then(() => this.client
                .db()
                .collection(this.collectionName)
                .createIndex({ 'type': 1 }, { 'unique': true }))
            .then(() => this)
    }

}
