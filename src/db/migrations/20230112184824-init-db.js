'use strict';

import { CategorySchema, CATEGORY_TABLE } from '../models/category.model';
import { CustomerSchema, CUSTOMER_TABLE } from '../models/customer.model';
import { OrderSchema, ORDER_TABLE } from '../models/order.model';
import {
  OrderProductSchema,
  ORDER_PRODUCT_TABLE,
} from '../models/orderProduct.model';
import { ProductSchema, PRODUCT_TABLE } from '../models/product.model';
import { UserSchema, USER_TABLE } from '../models/user.model';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropAllTables();
  },
};
