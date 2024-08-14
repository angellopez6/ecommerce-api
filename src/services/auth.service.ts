import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import UserService from "./user.service";
import jwt from "jsonwebtoken";
import conf from "../config/config";
import { mailConfig, mailerTransport } from "../utils/constants/mailer";
import { TmailConfig } from "types/TmailConfig";
import nodemailer from "nodemailer";

const service = new UserService();

class AuthService {
  async getUser(email: string, password: string) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) throw boom.unauthorized();
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signToken(user: any) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, conf.jwtSecret, { expiresIn: "30min" });
    return { user, token };
  }

  async sendRecovery(email: string) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(user.dataValues.recoveryToken, conf.jwtSecret, (err: any) => {
      if (!err)
        throw boom.badRequest(
          "You have already requested a password change recently..."
        );
    });
    const payload = { sub: user.dataValues.id };
    const token = jwt.sign(payload, conf.jwtSecret, { expiresIn: "15min" });
    await user.update({ recoveryToken: token });
    const res = await this.sendEmail(mailConfig(user.dataValues.email, token));
    return res;
  }

  async sendEmail(infoMail: TmailConfig) {
    const transporter = nodemailer.createTransport(mailerTransport);
    await transporter.sendMail(infoMail);
    return { message: "We have sent an email to recover your password" };
  }

  async changePassword(token: string, newPassword: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = jwt.verify(token, conf.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.dataValues.recoveryToken !== token) throw boom.unauthorized();
      const hash = await bcrypt.hash(newPassword, 10);
      await user.update({ recoveryToken: null, password: hash });
      return { message: "You have successfully changed your password" };
    } catch (err) {
      throw boom.unauthorized();
    }
  }
}

export default AuthService;
