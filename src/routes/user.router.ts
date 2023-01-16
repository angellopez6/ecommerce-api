import validatorHandler from "../middlewares/validator.handler";
import exrpess from "express";
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/users.schema";
import UserService from "../services/user.service";
import { checkRoles } from "../middlewares/auth.handler";
import passport from "passport";
import { Trole } from "../types/Troles";

const router = exrpess.Router();
const service = new UserService();

const USER_ROUTES = {
  findAll: "/",
  findOne: "/:id",
  createOne: "/",
  updateOne: "/:id",
  DeleteOne: "/:id",
};

router.get(
  USER_ROUTES.findAll,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  USER_ROUTES.findOne,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  USER_ROUTES.createOne,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const nextUser = await service.create(data);
      res.status(201).json(nextUser);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  USER_ROUTES.updateOne,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const userUpdate = await service.update(id, changes);
      res.status(201).json(userUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  USER_ROUTES.DeleteOne,
  passport.authenticate("jwt", { session: false }),
  checkRoles(Trole.admin),
  validatorHandler(getUserSchema, "params"),
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
