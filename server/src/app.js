import express from "express";
import TaskDatabase from "./config/db.js";
import TaskRoutes from './routes/task.routes.js';
import UserRouter from './routes/user.routes.js';
const app = express();
const port = 3000;

app.use('/api/', TaskRoutes);

app.use('/api/', UserRouter);

TaskDatabase.sync().then(() => {
  app.listen(port, () => {
    console.log(`Task Tracker listening on port ${port}`);
  });
}).catch((error) => {
  console.error('Unable to sync database:', error);
});