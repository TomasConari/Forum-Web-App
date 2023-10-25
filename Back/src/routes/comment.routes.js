import { Router } from "express";
import { commentControllers } from "../controllers/comment.controllers.js";
import { tokenVerify } from "../middleware/token-verify.js";

const route = Router();

route.post("/Comment/create/:id", tokenVerify, (req, res) => commentControllers.create(req, res));
route.put("/Comment/update/:id", tokenVerify, (req, res) => commentControllers.update(req, res));
route.delete("/Comment/delete/:id", tokenVerify, (req, res) => commentControllers.delete(req, res));
route.get("/comments", tokenVerify, (req, res) => commentControllers.getAll(req, res));
route.get("/comments/from/:id", tokenVerify, (req, res) => commentControllers.getFrom(req, res));
route.get("/comment", tokenVerify, (req, res) => commentControllers.getOne(req, res));

export default route;