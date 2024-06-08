import { DataTypes } from "sequelize";
import TaskDatabase from "../config/db.s";
import User from "./user.model.js"

const Task = TaskDatabase.define('tasks', {
  task_id: {
    type: DataTypes.UUID,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'user_id',
    }
  }
})

// 1:M
User.hasMany(Task, {foreignKey: 'user_id'});
Task.belongTo(User, {foreignKey: 'user_id'});

export default Task;