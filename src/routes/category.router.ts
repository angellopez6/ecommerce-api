import validatorHandler from "@app/middlewares/validator.handler";
import exrpess from "express";
import CategoryService from "@app/services/category.service";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "@app/schemas/categories.schema";

const router = exrpess.Router();
const service = new CategoryService();

const CATEGORY_ROUTES = {
  findAll: "/",
  findOne: "/:id",
  createOne: "/",
  updateOne: "/:id",
  DeleteOne: "/:id",
};

router.get(CATEGORY_ROUTES.findAll, async (req, res, next) => {
  try {
    const categories = await service.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

router.get(
  CATEGORY_ROUTES.findOne,
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  CATEGORY_ROUTES.createOne,
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const nextCategory = await service.create(data);
      res.status(201).json(nextCategory);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  CATEGORY_ROUTES.updateOne,
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const categoryUpdate = await service.update(id, changes);
      res.status(201).json(categoryUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  CATEGORY_ROUTES.DeleteOne,
  validatorHandler(getCategorySchema, "params"),
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
