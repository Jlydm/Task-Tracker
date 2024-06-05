import Sequelize from "sequelize";

const sequelize = new Sequelize("tasktrackerdb", "postgres", "admin123", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;