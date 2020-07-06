import * as Joi from '@hapi/joi'

export const createRequest = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .required(),
})
