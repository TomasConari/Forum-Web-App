import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const userControllers = {
    create: async (req, res) => {
        const { name, lastname, username, password } = req.body;
        try {
            const hash = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                lastname,
                username,
                password: hash
            };
            await User.create(newUser);
            res.status(201).json({
                ok: true,
                data: newUser
            });
        } catch (error) {
            throw new Error;
        };
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username: username });
            const hash = user.password;
            bcrypt.compare(password, hash, (err, result) => {
                if (result) {
                    const { _id, name, lastname, username } = user;
                    const payload = {
                        id: _id,
                        name,
                        lastname,
                        username
                    };
                    const token = Jwt.sign(payload, "secretKey");
                    res.status(200).json({
                        token
                    });
                } else {
                    res.status(401).json({
                        message: "Incorrect Password"
                    });
                };
            });
        } catch (error) {
            throw new Error;
        };
    },
    update: async (req, res) => {
        const { username: userUsername, role} = req.user;
        const { username: paramsUsername } = req.params;
        const newData = req.body;
        if((userUsername === paramsUsername) || (role === "admin")){
            try {
                const updatedUser = await User.findOneAndUpdate({ username: paramsUsername }, newData, { new: true });
                if (updatedUser === null) {
                    res.status(500).json({
                        message: "Could not find and update the user"
                    });
                } else {
                    res.status(200).json({
                        message: "User Updated",
                        data: updatedUser
                    });
                };
            } catch (error) {
                res.status(500).json({
                    message: "An error occurred during the update"
                });
            };
        }else{
            res.status(403).json({ 
                message: "Unauthorized",
                role: role
            });
        };
    },
    delete: async (req, res) => {
        const { username: userUsername, role} = req.user;
        const { username: paramsUsername } = req.params;
        if((userUsername === paramsUsername) || (role === "admin")){
            try{
                await User.deleteOne({username:paramsUsername});
                await Post.deleteMany({ user: userUsername });
                await Comment.deleteMany({ user: userUsername });
                res.status(200).json({ 
                message: "User deleted successfully",
                });
            }catch (error){
                res.status(500).json({ 
                    message: "An error occurred during the delete" 
                });
            };
        }else{
            res.status(403).json({ 
                message: "Unauthorized" 
            });
        };
    },
    getAll: async (req, res) => {
        try{
            const allUsers = await User.find();
            res.status(200).json({ 
                data: allUsers
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving workers"
            });
        };
    },
    search: async (req, res) => {
        const data = req.body;
        try{
            const search = await User.find(data);
            res.status(200).json({ 
                data: search
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the user"
            });
        };
    },
    getOne: async (req, res) => {
        const data = req.body;
        try{
            const user = await User.findOne(data);
            res.status(200).json({ 
                data: user
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the user"
            });
        };
    }
}