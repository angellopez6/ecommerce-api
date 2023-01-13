import validatorHandler from "@app/middlewares/validator.handler";
import exrpess from "express";
import { addOrderItemSchema, createOrderSchema, getOrderSchema } from "@app/schemas/order.schema";
import OrderService from "@app/services/order.service";

const router = exrpess.Router();
const service = new OrderService();

const ORDER_ROUTES = {
  findAll: "/",
  findOne: "/:id",
  createOne: "/",
  addItem: "/add-item"
};

router.get(ORDER_ROUTES.findAll, async (req, res, next) => {
  try {
    const orders = await service.find();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

router.get(
  ORDER_ROUTES.findOne,
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  ORDER_ROUTES.createOne,
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const nextOrder = await service.create(data);
      res.status(201).json(nextOrder);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  ORDER_ROUTES.addItem,
  validatorHandler(addOrderItemSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const orderItem = await service.addItem(data);
      res.status(201).json(orderItem);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
