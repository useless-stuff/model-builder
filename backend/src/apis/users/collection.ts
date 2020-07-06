import { AbstractCollection } from '../../services/mongodb/collection'
import { MongoClient } from 'mongodb'
import { IMongoDBCollection, IUser, MONGO_DB_COLLECTION, USER_ROLE } from '../../types'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcryptjs'
import { createDocument } from './validation'

const saltRound = 10

export const schema = {
    $jsonSchema: {
        properties: {
            email: {
                type: 'string',
                description: 'User email',
            },
            password: {
                type: 'string',
                description: 'User password',
            },
            createdAt: {
                type: 'string',
                description: 'Creation date',
            },
            role: {
                type: 'string',
                enum: Object.keys(USER_ROLE).map((key: keyof typeof USER_ROLE) => USER_ROLE[key]),
                description: 'User role',
            },
        },
    },
}

export class UserCollection extends AbstractCollection implements IMongoDBCollection {
    public collectionName = MONGO_DB_COLLECTION.USERS

    constructor(client: MongoClient) {
        super(client, MONGO_DB_COLLECTION.USERS, schema)
    }

    public init(): Promise<UserCollection> {
        return super.init()
            .then(() => this.client
                .db()
                .collection(this.collectionName)
                .createIndex({ 'email': 1 }, { 'unique': true }))
            .then(() => this)
    }

    public createUser(document: Partial<IUser>): Promise<Partial<IUser>> {
        const partial = {
            _id: uuid(),
            createdAt: String(new Date().toISOString()),
            password: bcrypt.hashSync(document.password, bcrypt.genSaltSync(saltRound)),
            role: USER_ROLE.USER,
        }
        const validatedDocument = createDocument.validate({ ...document, ...partial })
        if (validatedDocument.error) {
            throw new Error(validatedDocument.error)
        }
        return super.create<IUser>(this.collectionName, validatedDocument.value)
            .then(user => user && UserCollection.removeUserPassword(user))
    }

    public async findUserBy(filter: object): Promise<IUser> {
        return super.findOne<IUser>(filter, this.collectionName)
    }

    public static removeUserPassword(user: Partial<IUser>): Partial<IUser> {
        const { password, ...rest } = user
        return rest
    }

}
