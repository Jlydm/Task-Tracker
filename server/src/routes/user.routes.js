import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
const router = Router();

router.post("/createuser", createUser);

router.get("/getuser", getUser);

router.get("/getallusers", getAllUsers);

router.put("/updateuser/:id", updateUser);

router.get("/deleteuser", deleteUser);

export default router;