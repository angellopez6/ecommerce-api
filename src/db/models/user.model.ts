import { Sequelize, Model, DataTypes } from "sequelize";

const USER_TABLE = "user";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "custumer",
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
};

class User extends Model {
  static associate(models: Sequelize['models']) {
    this.hasOne(models.Customer, {
      as: "customer",
      foreignKey: "userId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
