import Joi from "joi";
import {
  stringPassswordError,
  strongPasswordRegex,
} from "../utils/constants/auth";

const email = Joi.string().email();
const token = Joi.string();
const newPassword = Joi.string()
  .pattern(new RegExp(strongPasswordRegex))
  .message(stringPassswordError);

const authRecoverySchema = Joi.object({
  email: email.required(),
});

const authChangePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

export { authRecoverySchema, authChangePasswordSchema };
