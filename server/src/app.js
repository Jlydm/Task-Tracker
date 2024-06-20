import express from "express";
import TaskDatabase from "./config/db.js";
import TaskRoutes from "./routes/api/task.routes.js";
import UserRoutes from "./routes/api/user.routes.js";
import MainRoutes from "./routes/web/web.routes.js";

const app = express();
const port = process.env.PORT || 3000;

// Parsing the info
app.use(express.json());

// Routes
app.use("/api/v1", UserRoutes);
app.use("/api/v1", TaskRoutes);
app.use("/main/v1", MainRoutes);

// Synchronizing the database
TaskDatabase.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Task Tracker listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

