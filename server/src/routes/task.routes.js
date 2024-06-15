import express, { Router } from 'express';
import { getTask, getAllTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
const router = Router();

router.post("/createtask", createTask);

router.get("/gettask", getTask);

router.get("/getalltask", getAllTasks);

router.put("/updatetask/:id", updateTask);

router.delete("/deletetask/:id", deleteTask);

export default router;