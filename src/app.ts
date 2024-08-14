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

const createApp = () => {
  // Main fail for virtual store API
  const app = express();
  app.use(express.json());

  const whitelist = [
    "http://localhost:8080",
    "https://virtual-store.es",
    "http://127.0.0.1:5173",
  ];
  const options: CorsOptions = {
    origin: (origin = "", cb) => {
      if (whitelist.includes(origin) || !origin) return cb(null, true);
      cb(new Error("Not allowed"));
    },
  };

  app.use(cors(options));

  require("./utils/auth/index");

  routerApi(app);

  app.get("/hello", (req, res) => {
    res.status(200).json({ name: "Angel" });
  });

  app.use(morgan("dev"));
  app.use(logErrors);
  app.use(sequelizeErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  return app;
};

export default createApp;
