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
};

export default conf;
