import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../../controllers/api/task.controller.js';
import { authenticationMiddleware } from '../../middleware/authenticate.js';
const router = Router();

router.post("/createtask", authenticationMiddleware, createTask);

router.get("/getalltask", authenticationMiddleware, getAllTasks);

router.put("/updatetask/:id", authenticationMiddleware, updateTask);

router.delete("/deletetask/:id", authenticationMiddleware, deleteTask);

export default router;