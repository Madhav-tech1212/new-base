import { Router } from "express";
import {getUsers} from "../controller/user.controller.js";
import {getUser} from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize,getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {res.send({title:"CREATE new user"});});

userRouter.put("/:id", (req, res) => {res.send({title:"UODATE new user Id"});});

userRouter.delete("/:id", (req, res) => {res.send({title:"DELETE user"});});

export default userRouter;


