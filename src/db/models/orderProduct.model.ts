import { Sequelize, Model, DataTypes } from "sequelize";
import { ORDER_TABLE } from "./order.model";
import { PRODUCT_TABLE } from "./product.model";

const ORDER_PRODUCT_TABLE = "order_product";

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    allowNull: false,
    field: "order_id",
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  productId: {
    allowNull: false,
    field: "product_id",
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.fn("NOW"),
  },
};

class OrderProduct extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: "OrderProduct",
      timestamps: false,
    };
  }
}

export { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
