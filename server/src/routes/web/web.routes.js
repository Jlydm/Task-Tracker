import { dashboard, logIn } from "../../controllers/web/web.controller.js";
import { authenticationMiddleware } from "../../middleware/authenticate.js";
import { Router } from "express";

const router = Router();

router.get("/login", logIn);

router.get("/dashboard", authenticationMiddleware, dashboard);

export default router;