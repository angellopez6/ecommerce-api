import { TvalidationHandler } from "../types/TvalidationHandler";
import boom from "@hapi/boom";

const validatorHandler: TvalidationHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return next();
    next(boom.badRequest(JSON.stringify(error)));
  };
};

export default validatorHandler;
