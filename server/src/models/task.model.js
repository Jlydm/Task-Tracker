import { DataTypes } from "sequelize";
import BelongsTo from "sequelize";
import TaskDatabase from "../config/db.js";
import User from "./user.model.js";

const Task = TaskDatabase.define("tasks", {
  task_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
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
  date: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    allowNull: false,
    validate: {
      isDate: true, 
      isAfter: new Date().toISOString().split('T')[0],
    }
  },
  state: {
    type: DataTypes.BOOLEAN,
  },
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    references: {
      model: User,
      key: "user_id",
    },
  },
});

// 1:M
User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

export default Task;
