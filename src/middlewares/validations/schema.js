const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productNameSchema = Joi.string().min(5).required().messages({
  'string.base': '"name" should be a type of "text"',
  'string.empty': '"name" cannot be an empty field',
  'string.min': '"name" length must be at least 5 characters long',
  'any.required': '"name" is required',
});

module.exports = {
  idSchema,
  productNameSchema,
};
