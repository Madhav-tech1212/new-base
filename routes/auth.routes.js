import { Router } from "express";
import { signUp,signIn,signOut } from "../controller/auth.controller.js";  


const authRouter = Router();


// -> /api/v1/auth/sign-up --> POST BODY --> {name, email, password} --> CREATES A NEW USER
authRouter.post("/Sign-Up", signUp);

// -> /api/v1/auth/sign-in --> POST BODY --> {email, password} --> VALIDATE AND CHECK-IN USER
authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;