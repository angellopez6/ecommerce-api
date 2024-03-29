import validatorHandler from "@app/middlewares/validator.handler";
import exrpess from "express";
import CustomerService from "@app/services/customer.service";
import {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} from "@app/schemas/customers.schema";

const router = exrpess.Router();
const service = new CustomerService();

const CUSTOMER_ROUTES = {
  findAll: "/",
  findOne: "/:id",
  createOne: "/",
  updateOne: "/:id",
  DeleteOne: "/:id",
};

router.get(CUSTOMER_ROUTES.findAll, async (req, res, next) => {
  try {
    const customers = await service.find();
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
});

router.get(
  CUSTOMER_ROUTES.findOne,
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  CUSTOMER_ROUTES.createOne,
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const nextCustomer = await service.create(data);
      res.status(201).json(nextCustomer);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  CUSTOMER_ROUTES.updateOne,
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const customerUpdate = await service.update(id, changes);
      res.status(201).json(customerUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  CUSTOMER_ROUTES.DeleteOne,
  validatorHandler(getCustomerSchema, "params"),
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
