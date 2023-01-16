import { Troles } from "..//types/Troles";
import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

const checkRoles = (...roles: Troles) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req: Request | any, res: Response, next: NextFunction) => {
    const { role = "" } = req.user;
    return !roles.includes(role)
      ? next(
          boom.unauthorized(
            "You do not have permissions to execute this action."
          )
        )
      : next();
  };
};

export { checkRoles };
