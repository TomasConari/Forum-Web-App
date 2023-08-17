import { Router } from "express";
import { commentControllers } from "../controllers/comment.controllers.js";
import { tokenVerify } from "../middleware/token-verify.js";

const route = Router();

route.post("/comment/create", tokenVerify, (req, res) => commentControllers.create(req, res));
route.put("/comment/update/:id", tokenVerify, (req, res) => commentControllers.update(req, res));
route.delete("/comment/delete", tokenVerify, (req, res) => commentControllers.delete(req, res));
route.get("/comments", tokenVerify, (req, res) => commentControllers.getAll(req, res));
route.get("/comment", tokenVerify, (req, res) => commentControllers.getOne(req, res));

export default route;