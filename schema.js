const Joi = require("joi");

const cafeSchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required(),
    location: Joi.string().trim().min(1).required(),
    state: Joi.string().trim().min(1).required()
}).unknown(true);

const workSchema = Joi.object({
    category: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required(),
    price: Joi.number().min(0).required()
}).unknown(true);

module.exports = { cafeSchema, workSchema };