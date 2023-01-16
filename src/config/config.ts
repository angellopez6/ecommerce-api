import { Tenviroment } from "../types/Tenviroment";
import dotenv from "dotenv";

dotenv.config();
// List of env variables:
const {
  NODE_DB_USER = "",
  NODE_DB_PASSWORD = "",
  PORT = 3000,
  NODE_DB_HOST = "",
  NODE_DB_NAME = "",
  NODE_DB_PORT = "",
  HOST = "http://localhost",
  APP_VERSION = "",
  JWT_SECRET,
  AUTH_MAIL_USER,
  AUTH_MAIL_PASSWORD,
  AUTH_MAIL_HOST,
  AUTH_MAIL_PORT,
} = process.env;

const conf: Tenviroment = {
  env: process.env.NODE_ENV || "dev",
  port: Number(PORT),
  dbUser: encodeURIComponent(NODE_DB_USER),
  dbPassword: encodeURIComponent(NODE_DB_PASSWORD),
  dbHost: NODE_DB_HOST,
  dbName: NODE_DB_NAME,
  dbPort: NODE_DB_PORT,
  HOST,
  APP_VERSION,
  jwtSecret: JWT_SECRET,
  authMailUser: AUTH_MAIL_USER,
  authMailPassword: AUTH_MAIL_PASSWORD,
  authMailHost: AUTH_MAIL_HOST,
  authMailPort: AUTH_MAIL_PORT,
};

export default conf;
