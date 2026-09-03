import { Router } from "express";

import { registerValidator } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);

export default authRouter;