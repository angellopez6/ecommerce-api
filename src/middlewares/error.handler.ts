import { ValidationError } from "sequelize";
import { middlewareFNC } from "../types/Tmiddlewares";

export const logErrors: middlewareFNC = (err, req, res, next) => {
  // console.error(err);
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const errorHandler: middlewareFNC = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const sequelizeErrorHandler: middlewareFNC = (err, req, res, next) => {
  if (!(err instanceof ValidationError)) return next(err);
  res.status(409).json({
    statusCode: 409,
    message: err.name,
  });
};

export const boomErrorHandler: middlewareFNC = (err, req, res, next) => {
  if (!err.isBoom) return next(err);
  const { output } = err;
  res.status(output.statusCode).json(output.payload);
};
