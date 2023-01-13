import { Sequelize, Model, DataTypes } from "sequelize";
import { USER_TABLE } from "./user.model";

const CUSTOMER_TABLE = "customer";

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  lastName: {
    allowNull: false,
    field: "last_name",
    type: DataTypes.STRING(30),
  },
  surname: {
    allowNull: false,
    type: DataTypes.STRING(30),
  },
  birthday: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING(15),
  },
  userId: {
    allowNull: false,
    field: "user_id",
    unique: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
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

class Customer extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.User, { as: "user" });
    this.hasMany(models.Order, {
      as: "orders",
      foreignKey: "customerId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: "Customer",
      timestamps: false,
    };
  }
}

export { CUSTOMER_TABLE, CustomerSchema, Customer };
