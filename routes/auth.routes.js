import { Router } from "express";
import { signUp,signIn,signOut } from "../controller/auth.controller.js";  


const authRouter = Router();

// path: /api/v1/auth/sign-up

authRouter.post("/Sign-Up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;