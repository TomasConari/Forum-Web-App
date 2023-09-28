import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const userControllers = {
    create: async (req, res) => {
        try{
            const { name, lastname, username, password } = req.body;
            try{
                const hash = await bcrypt.hash(password, 10);
                const newUser = {
                    name,
                    lastname,
                    username,
                    password: hash
                };
                await User.create(newUser);
                return res.status(201).json({
                    ok: true,
                    data: newUser
                });
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    ok: false,
                    error: "Error Creating User"
                });
            };
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                error: "Missing Fields"
            });
        };
    },
    login: async (req, res) => {
        try{
            const { username, password } = req.body;
            try{
                const user = await User.findOne({ username: username });
                if(!user){
                    return res.status(401).json({
                    message: "User not found"
                    });
                };
                const hash = user.password;
                try{
                    bcrypt.compare(password, hash, (err, result) => {
                        if(result){
                            try{
                                const { _id, name, lastname, username, role } = user;
                                const payload = {
                                    id: _id,
                                    name,
                                    lastname,
                                    username,
                                    role
                                };
                                const token = Jwt.sign(payload, "secretKey");
                                res.status(200).json({
                                    token
                                });
                            }catch(error){
                                console.error(error);
                                return res.status(500).json({
                                    message: "Error Loading The Payload"
                                });
                            };
                        }else{
                            res.status(401).json({
                                message: "Incorrect Password"
                            });
                        };
                    });
                }catch(error){
                    console.error(error);
                    return res.status(500).json({
                        message: "Error Verifying The Password"
                    });
                };
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            };
        }catch{
            console.error(error);
            return res.status(500).json({
                message: "Missing Fields"
            });
        };
    },
    update: async (req, res) => {
        try{
            const { username: userUsername, role} = req.user;
            const { username: paramsUsername } = req.params;
            const newData = req.body;
            if((userUsername === paramsUsername) || (role === "admin")){
                try{
                    const updatedUser = await User.findOneAndUpdate({ username: paramsUsername }, newData, { new: true });
                    if(updatedUser === null){
                        res.status(500).json({
                            message: "Could not Find and Update the User"
                        });
                    }else{
                        res.status(200).json({
                            message: "User Updated",
                            data: updatedUser
                        });
                    };
                }catch(error){
                    console.error(error);
                    res.status(500).json({
                        message: "An Error Occurred During the Update"
                    });
                };
            }else{
                res.status(403).json({ 
                    message: "Unauthorized",
                    role: role
                });
            };
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                error: "Missing Fields"
            });
        };
    },
    delete: async (req, res) => {
        try{
            const { username: localUser, role: localRole } = req.user;
            try{
                const { username: bodyUser, id: bodyId} = req.body;
                try{
                    if((localUser === bodyUser) || (localRole === "admin")){
                        try{
                            try{
                                await Comment.deleteMany({ from: bodyId });
                                await Comment.deleteMany({ user: localUser });
                            }catch(error){
                                console.error(error);
                                return res.status(500).json({
                                    ok: false,
                                    error: "An Error Occurred Deleting the Comments"
                                });
                            };
                            try{
                                await Post.deleteMany({ user: bodyUser });
                            }catch(error){
                                console.error(error);
                                return res.status(500).json({
                                    ok: false,
                                    error: "An Error Occurred Deleting the Posts"
                                });
                            };
                            await User.deleteOne({ username: bodyUser });
                            res.status(200).json({
                                message: "User deleted successfully",
                            });
                        }catch(error){
                            console.error(error);
                            return res.status(500).json({
                                message: "An Error Occurred Deleting the User"
                            });
                        };
                    }else{
                        return res.status(403).json({
                            message: "Unauthorized"
                        });
                    };
                }catch(error){
                    console.error(error);
                    return res.status(500).json({
                        ok: false,
                        error: "An Error Occurred During The Delete"
                    });
                };
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    ok: false,
                    error: "Error Getting Body Info"
                });
            };
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                error: "Error Getting Local User Info"
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
                message: "An Error Occurred While Retrieving Users"
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
                message: "An Error Occurred While Searching the User(s)"
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
                message: "An Error Occurred While Retrieving the User"
            });
        };
    }
};