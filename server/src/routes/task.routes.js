import express, { Router } from 'express';
import { getTask, getAllTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
const router = Router();

router.get("/createtask", createTask);

router.get("/gettask", getTask);

router.get("/getalltask", getAllTasks);

router.get("/updatetask", updateTask);

router.get("/deletetask", deleteTask);

export default router;