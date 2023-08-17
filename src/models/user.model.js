import { Schema, model } from "mongoose";
import { postSchema } from "./post.model.js";

export const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: "user"
    },
    posts: {
        type: [postSchema]
    }
},
{
    timestamps: true
});

export const User = model("User", userSchema);