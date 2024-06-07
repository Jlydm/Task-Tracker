import { DataTypes } from "sequelize";
import TaskDatabase from "../config/db.js";

const User = TaskDatabase.define("users", {
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;