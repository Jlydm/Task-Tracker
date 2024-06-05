import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
});
