import { Schema, model } from "mongoose";

export const commentSchema = new Schema({
    user: {
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