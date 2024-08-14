import setupModels from "../db/models";
import { Sequelize } from "sequelize";
import options from "../db/config";
import config from "../config/config";

const { development: dev, production: prod } = options;

const URI = config.env === "development" ? dev.url : prod.url;

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: false,
});

setupModels(sequelize);

export default sequelize;
