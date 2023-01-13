import { Sequelize, Model, DataTypes } from "sequelize";

const CATEGORY_TABLE = "category";

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(150),
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
};

class Category extends Model {
  static associate(models: Sequelize["models"]) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: "categoryId"
    })
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: false,
    };
  }
}

export { CATEGORY_TABLE, CategorySchema, Category };
