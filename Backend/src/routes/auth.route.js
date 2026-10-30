import express from "express";
import { getMeController, loginUserController, logoutUserController, registerUserController } from "../controller/auth.controller.js";
import authuser from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",registerUserController)
authRouter.post("/login",loginUserController)
authRouter.get("/logout",logoutUserController);

authRouter.get("/get-me",authuser,getMeController)

export default authRouter;