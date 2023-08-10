import { Router } from "express";
import { userControllers } from "../controllers/user.controllers.js";

const route = Router();

route.post("/createuser", (req, res) => userControllers.create(req, res));

export default route;