import { Schema, model } from "mongoose";

export const commentSchema = new Schema({
    username: {
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

export const Comment = model("Comment", commentSchema);