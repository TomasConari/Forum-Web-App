import { Router } from "express";
import { postControllers } from "../controllers/post.controllers.js";
import { tokenVerify } from "../middleware/token-verify.js";

const route = Router();

route.post("/post/create", tokenVerify, (req, res) => postControllers.create(req, res));
route.put("/post/update/:title", tokenVerify, (req, res) => postControllers.edit(req, res));
route.delete("/post/delete", tokenVerify, (req, res) => postControllers.delete(req, res));
route.get("/posts", tokenVerify, (req, res) => postControllers.getAll(req, res));
route.get("/post", tokenVerify, (req, res) => postControllers.getOne(req, res));

export default route;