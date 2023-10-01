import { Schema, model } from "mongoose";

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
    }
},
{
    timestamps: true
});

export const Post = model("Post", postSchema);