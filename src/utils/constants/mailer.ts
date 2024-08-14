import conf from "../../config/config";
import { TmailConfig } from "types/TmailConfig";

export const mailConfig = (email: string, token: string) => {
  const link = `https://myfronted.com/recovery?recovery_token=${token}`;
  const mailer: TmailConfig = {
    from: conf.authMailUser,
    to: email,
    subject: "Recovery password",
    text: "",
    html: `
    <h1>Has solicitado un cambio de contraseña, si no lo hiciste omite este correo.</h1>
    <b>Para recuperar su contraseña ingrese aquí: ${link}</b>
    `,
  };
  return mailer;
};

export const mailerTransport = {
  host: conf.authMailHost,
  port: conf.authMailPort,
  secure: false,
  auth: {
    user: conf.authMailUser,
    pass: conf.authMailPassword,
  },
};
