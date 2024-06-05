import express from "express";
import sequelize from "./config/db.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Task Tracker listening on port ${port}`);
// });

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Task Tracker listening on port ${port}`);
  });
}).catch((error) => {
  console.error('Unable to sync database:', error);
});