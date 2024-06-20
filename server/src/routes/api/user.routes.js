import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../../controllers/api/user.controller.js";
import { authenticationMiddleware } from "../../middleware/authenticate.js";
const router = Router();

router.post("/createuser", authenticationMiddleware, createUser);

router.get("/getuser", authenticationMiddleware, getUser);

router.get("/getallusers", authenticationMiddleware, getAllUsers);

router.put("/updateuser/:id", authenticationMiddleware, updateUser);

router.delete("/deleteuser/:id", authenticationMiddleware, deleteUser);

export default router;