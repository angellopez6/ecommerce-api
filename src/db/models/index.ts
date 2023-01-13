import { Sequelize } from "sequelize";
import { Category, CategorySchema } from "./category.model";
import { Customer, CustomerSchema } from "./customer.model";
import { Order, OrderSchema } from "./order.model";
import { OrderProduct, OrderProductSchema } from "./orderProduct.model";
import { Product, ProductSchema } from "./product.model";
import { User, UserSchema } from "./user.model";

const setupModels = (sequelize: Sequelize) => {
  // Initializing Models
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  // Initializing relationships
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
};

export default setupModels;
