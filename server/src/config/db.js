import Sequelize from "sequelize";

const TaskDatabase = new Sequelize(
  "tasktrackerdb", 
  "postgres", 
  "admin123", 
  {
    host: "localhost",
    dialect: "postgres",
});

export default TaskDatabase;
