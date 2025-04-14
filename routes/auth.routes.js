import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {res.send({title:"Login Page"});});
authRouter.post("/sign-in", (req, res) => {res.send({title:"Sign-in Page"});});
authRouter.post("/sign-out", (req, res) => {res.send({title:"Sign-out Page"});});

export default authRouter;