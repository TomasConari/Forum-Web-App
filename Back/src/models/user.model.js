import { Schema, model } from "mongoose";

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
    }
},
{
    timestamps: true
});

export const User = model("User", userSchema);