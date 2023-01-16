import validatorHandler from "../middlewares/validator.handler";
import {
  authChangePasswordSchema,
  authRecoverySchema,
} from "../schemas/auth.schema";
import AuthService from "../services/auth.service";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

const router = express.Router();
const AUTH_ROUTER = {
  login: "/login",
  recovery: "/recovery",
  changePassword: "/change-password",
};

const service = new AuthService();

router.post(
  AUTH_ROUTER.login,
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      res.status(200).json(service.signToken(user));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  AUTH_ROUTER.recovery,
  validatorHandler(authRecoverySchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const mailer = await service.sendRecovery(email);
      res.status(200).json(mailer);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  AUTH_ROUTER.changePassword,
  validatorHandler(authChangePasswordSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.status(200).json(rta);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
