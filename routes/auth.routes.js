import { Router } from "express";
import { signUp } from "../controller/auth.controller";  
import { signIn } from "../controller/auth.controller";  
import { signOut } from "../controller/auth.controller";  

const authRouter = Router();

authRouter.post("/SignUp", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;