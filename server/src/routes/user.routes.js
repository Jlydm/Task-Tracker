import express, { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
const router = Router();

router.get("/createuser", createUser);

router.get("/getuser", getUser);

router.get("/getallusers", getAllUsers);

router.get("/updateuser", updateUser);

router.get("/deleteuser", deleteUser);

export default router;