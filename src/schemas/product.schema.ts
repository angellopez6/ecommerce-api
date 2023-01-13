import Joi from "joi";

const id = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const name = Joi.string().min(10).max(150);
const price = Joi.number().precision(2);
const image = Joi.string().uri();
const description = Joi.string().min(15);
const categoryId = Joi.number().integer();

const queryProductSchema = Joi.object({
  limit,
  offset,
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image,
  description: description,
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

export {
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
