import { Schema, model } from "mongoose";
import { commentSchema } from "./comment.model.js";

export const postSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    comments:{
        type: [commentSchema]
    }
},
{
    timestamps: true
});

export const Post = model("Post", postSchema);