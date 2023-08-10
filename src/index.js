import express from "express";
import bodyParser from "body-parser";
import { conn } from "./database/db.js";
import userRoutes from "./routes/user.routes.js"

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8000;

//routes
app.use(userRoutes);

conn();

app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
});