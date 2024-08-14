import Joi from "joi";
import {
  stringPassswordError,
  strongPasswordRegex,
} from "../utils/constants/auth";

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string()
  .pattern(new RegExp(strongPasswordRegex))
  .message(stringPassswordError);
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
  role,
});

export { getUserSchema, createUserSchema, updateUserSchema };
