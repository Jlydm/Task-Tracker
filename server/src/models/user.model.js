import { DataTypes, Sequelize } from "sequelize";
import TaskDatabase from "../config/db";

const User = TaskDatabase.define(
  'users', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    }
  }
)