import validatorHandler from "../middlewares/validator.handler";
import {
  createProductSchema,
  getProductSchema,
  queryProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";
import express from "express";
import ProductsService from "../services/product.service";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { checkRoles } from "@app/middlewares/auth.handler";
import { Trole } from "../types/Troles";

const router = express.Router();
const service = new ProductsService();

const PRODUCT_ROUTES = {
  findAll: "/",
  findOne: "/:id",
  createOne: "/",
  updateOne: "/:id",
  DeleteOne: "/:id",
};

router.get(
  PRODUCT_ROUTES.findAll,
  validatorHandler(queryProductSchema, "query"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await service.find(req.query);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  PRODUCT_ROUTES.findOne,
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  PRODUCT_ROUTES.createOne,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const nextProduct = await service.create(data);
      res.status(201).json(nextProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  PRODUCT_ROUTES.updateOne,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const productUpdate = await service.update(id, changes);
      res.status(201).json(productUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  PRODUCT_ROUTES.DeleteOne,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ id });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
