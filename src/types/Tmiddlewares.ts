/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";

export type middlewareFNC = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
