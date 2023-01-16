import { TvalidationHandler } from "../types/TvalidationHandler";
import boom from "@hapi/boom";

const validatorHandler: TvalidationHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error }: any = schema.validate(data, { abortEarly: false });
    if (!error) return next();
    next(boom.badRequest(error));
  };
};

export default validatorHandler;
