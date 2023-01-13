import express from "express";
import productsRouter from "../routes/products.router";
import categoryRouter from "../routes/category.router";
import customerRouter from "../routes/customer.router";
import userRouter from "../routes/user.router";
import orderRouter from "../routes/order.router";

function routerApi(app: express.Application) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/categories", categoryRouter);
  router.use("/customers", customerRouter);
  router.use("/users", userRouter);
  router.use("/orders", orderRouter);
}

export default routerApi;
