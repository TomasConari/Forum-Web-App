import { Schema, model } from "mongoose";
import { postSchema } from "./post.model.js";

export const feedSchema = new Schema({
    feed: {
        type: [postSchema]
    }
},
    {
        timestamps: true
    });

export const Feed = model("Feed", feedSchema);