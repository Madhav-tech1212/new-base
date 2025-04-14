import e, { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {res.send({title:"GET all subscription"});});

subscriptionRouter.get("/:id", (req, res) => {res.send({title:"GET subscription details"});});

subscriptionRouter.post("/:id", (req, res) => {res.send({title:"CREATE subscription details"});});

subscriptionRouter.post("/", (req, res) => {res.send({title:"CREATE subscription details"});});

subscriptionRouter.put("/:id", (req, res) => {res.send({title:"UPDATE subscription details"});});

subscriptionRouter.delete("/:id", (req, res) => {res.send({title:"DELETE subscription"});});

subscriptionRouter.get("/user/:id", (req, res) => {res.send({title:"GET all subscription"});});

subscriptionRouter.put("/:id/cancel", (req, res) => {res.send({title:"CANCEL subscription"});});

subscriptionRouter.get("/upcoming-renwals", (req, res) => {res.send({title:"GET upcoming renwals"});});

export default subscriptionRouter;