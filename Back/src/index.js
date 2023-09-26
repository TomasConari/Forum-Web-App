import express from "express";
import bodyParser from "body-parser";
import { conn } from "./database/db.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8000;

//routes
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

conn();

app.listen(PORT, () => {
    console.log(`Running in http://192.168.20.30:${PORT}`);
});