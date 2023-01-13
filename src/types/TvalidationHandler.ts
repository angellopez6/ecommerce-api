/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
export type RequestProperty = "body" | "query" | "params";

export type TvalidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type TvalidationHandler = (
  schema: Schema,
  property: RequestProperty
) => TvalidatorMiddleware;
