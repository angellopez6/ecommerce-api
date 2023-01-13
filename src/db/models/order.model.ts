import { string } from "joi";
import { Sequelize, Model, DataTypes } from "sequelize";
import { CUSTOMER_TABLE } from "./customer.model";

const ORDER_TABLE = "order";

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    allowNull: false,
    field: "customer_id",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
};

class Order extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Customer, { as: "customer" });
    this.belongsToMany(models.Product, {
      as: "items",
      through: "OrderProduct",
      foreignKey: "orderId",
      otherKey: "productId",
    });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  }
}

export { ORDER_TABLE, OrderSchema, Order };
