import Joi from "joi";

export const processReceiptValidator = Joi.object({
        retailer: Joi.string().required(),
        purchaseDate: Joi.string().required(),
        purchaseTime: Joi.string().required(),
        items: Joi.array().items(Joi.object({
            shortDescription: Joi.string().required(),
            price: Joi.string().required()
        })).required(),
        total: Joi.string().required()
    })

export const getPointsValidator = Joi.object({
    id: Joi.string().required()
}).required()