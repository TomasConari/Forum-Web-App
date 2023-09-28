import { Router } from "express";
import { userControllers } from "../controllers/user.controllers.js";
import { tokenVerify } from "../middleware/token-verify.js";

const route = Router();

route.post("/user/create", (req, res) => userControllers.create(req, res));
route.post("/user/login", (req, res) => userControllers.login(req, res));
route.put("/user/update/:username", tokenVerify, (req, res) => userControllers.update(req, res));
route.delete("/user/delete", tokenVerify, (req, res) => userControllers.delete(req, res));
route.get("/users", tokenVerify, (req, res) => userControllers.getAll(req, res));
route.get("/users/search", tokenVerify, (req, res) => userControllers.search(req, res));
route.get("/user", tokenVerify, (req, res) => userControllers.getOne(req, res));

export default route;