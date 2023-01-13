import { Sequelize, Model, DataTypes } from "sequelize";
import { CATEGORY_TABLE } from "./category.model";

const PRODUCT_TABLE = "product";

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  image: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "category_id",
    references: {
      model: CATEGORY_TABLE,
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

class Product extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Category, {
      as: "category",
    });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}

export { PRODUCT_TABLE, ProductSchema, Product };
