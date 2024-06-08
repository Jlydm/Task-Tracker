import express from "express";
import TaskDatabase from "./config/db.js";
import TaskRoutes from "./routes/task.routes.js";
import UserRouter from "./routes/user.routes.js";
const app = express();
const port = 3000;

// Synchronizing the database
TaskDatabase.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

// Parsing the info 
app.use(express.json())

// Routes
app.use("/api/", UserRouter);

app.use("/api/", TaskRoutes);

// Initializing the server
TaskDatabase.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Task Tracker listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
