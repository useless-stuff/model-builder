import * as Joi from '@hapi/joi'
import { USER_ROLE } from '../../types'

export const createDocument = Joi.object({
    _id: Joi.string()
        .uuid()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .required(),
    createdAt: Joi.string().required(),
    role: Joi.string()
        .valid(USER_ROLE.USER, USER_ROLE.ADMIN)
        .required(),
})


export const createRequest = createDocument.keys({
    _id: Joi.forbidden(),
    createdAt: Joi.forbidden(),
    role: Joi.forbidden(),
})
