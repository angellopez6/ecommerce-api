import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  sequelizeErrorHandler,
} from "./middlewares/error.handler";
import routerApi from "./routes/index";

// Main fail for virtual store API
const app = express();
const APP_VER = process.env.APP_VERSION;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

app.use(express.json());

const whitelist = ["http://localhost:8080", "https://virtual-store.es"];
const options: CorsOptions = {
  origin: (origin = "", cb) => {
    if (whitelist.includes(origin) || !origin) return cb(null, true);
    cb(new Error("Not allowed"));
  },
};

app.use(cors(options));

require("./utils/auth/index");

routerApi(app);

app.use(morgan("dev"));
app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ecommerce API ${APP_VER} running on ${HOST}:${PORT}`);
});
