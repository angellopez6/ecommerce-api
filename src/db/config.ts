import config from "../config/config";

const { dbUser, dbPassword, dbPort, dbName, dbHost } = config;

const url = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const options = {
  development: {
    url,
    dialect: "postgres",
  },
  production: {
    url,
    dialect: "postgres",
  },
};

export default options;

module.exports = options;
