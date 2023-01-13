import Joi from "joi";

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string();

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email,
  password,
  role,
});

export { getUserSchema, createUserSchema, updateUserSchema };
