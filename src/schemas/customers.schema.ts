import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const surname = Joi.string().min(3).max(30);
const birthday = Joi.date();
const phone = Joi.string().max(15);
const userId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  surname: surname.required(),
  birthday: birthday.required(),
  phone,
  userId: userId.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  surname,
  birthday,
  phone,
  userId,
});

export { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
