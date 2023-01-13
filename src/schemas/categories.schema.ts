import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(3).max(150);
const image = Joi.string().uri();
const description = Joi.string().min(15);

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image,
  description: description,
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
  description: description,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

export { createCategorySchema, updateCategorySchema, getCategorySchema };
