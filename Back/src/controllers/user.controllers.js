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
                    message: "User Created",
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
                        ok: false,
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
                                return res.status(200).json({
                                    ok: true,
                                    token
                                });
                            }catch(error){
                                console.error(error);
                                return res.status(500).json({
                                    ok: false,
                                    message: "Error Loading The Payload"
                                });
                            };
                        }else{
                            return res.status(401).json({
                                ok: false,
                                message: "Incorrect Password"
                            });
                        };
                    });
                }catch(error){
                    console.error(error);
                    return res.status(500).json({
                        ok: false,
                        message: "Error Verifying The Password"
                    });
                };
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    ok: false,
                    message: "Internal Server Error"
                });
            };
        }catch{
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "Missing Fields"
            });
        };
    },
    update: async (req, res) => {
        try{
            const { username: paramUser } = req.params;
            const { 
                currentPassword: bodyCurrentPassword, 
                newPassword: bodyNewPassword, 
                name: bodyName, 
                lastname: bodyLastname, 
                username: bodyUser 
            } = req.body;
            const newHash = await bcrypt.hash(bodyNewPassword, 10);
            const newData = {
                name: bodyName,
                lastname: bodyLastname,
                username: bodyUser,
                password: newHash
            };
            try{
                const user = await User.findOne({ username: paramUser });
                if(!user){
                    return res.status(401).json({
                        ok: false,
                        message: "User not found"
                    });
                };
                const hash = user.password;
                try{
                    bcrypt.compare(bodyCurrentPassword, hash, async (err, result) => {
                        if(result){
                            try{
                                const updatedUser = await User.findOneAndUpdate({ username: paramUser }, newData, { new: true });
                                const updatePosts = await Post.updateMany({ user: paramUser }, { user: newData.username }, { new: true });
                                const updateComments = await Comment.updateMany({ user: paramUser }, { user: newData.username }, { new: true });
                                if(!(updatedUser === null) && ((updatePosts === null) && (updateComments === null))){
                                    return res.status(500).json({
                                        ok: false,
                                        message: "Could not Find and Update the User"
                                    });
                                }else{
                                    const { _id, name, lastname, username, role } = updatedUser;
                                    const payload = {
                                        id: _id,
                                        name,
                                        lastname,
                                        username,
                                        role
                                    };
                                    const token = Jwt.sign(payload, "secretKey");
                                    return res.status(200).json({
                                        ok: true,
                                        token,
                                        updatedUser
                                    });
                                };
                            }catch(error){
                                console.error(error);
                                return res.status(500).json({
                                    ok: false,
                                    message: "Error Updating the User"
                                });
                            };
                        }else{
                            return res.status(401).json({
                                ok: false,
                                message: "Incorrect Password"
                            });
                        };
                    });
                }catch(error){
                    console.error(error);
                    return res.status(500).json({
                        ok: false,
                        message: "Error Verifying The Password"
                    });
                };
            }catch(error){
                console.error(error);
                res.status(500).json({
                    ok: false,
                    message: "An Error Occurred During the Update"
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
            const { username : paramUser } = req.params;
            const user = await User.findOne({ username: paramUser });
            const posts = await Post.find({ user: paramUser });
            const postIds = posts.map((post) => post._id);
            const idsArray = Object.values(postIds);
            const length = idsArray.length;
            try{
                const hash = user.password;
                const { password } = req.body;
                try{
                    if(localUser === paramUser){
                        try{
                            bcrypt.compare(password, hash, async (err, result) => {
                                if(result){
                                    try{
                                        for(let i = 0; i < length; i += 1){
                                            await Comment.deleteMany({ from: idsArray[i] });
                                        };
                                        await Comment.deleteMany({ user: localUser });
                                    }catch(error){
                                        console.error(error);
                                        return res.status(500).json({
                                            ok: false,
                                            error: "An Error Occurred Deleting the Comments"
                                        });
                                    };
                                    try{
                                        await Post.deleteMany({ user: paramUser });
                                    }catch(error){
                                        console.error(error);
                                        return res.status(500).json({
                                            ok: false,
                                            error: "An Error Occurred Deleting the Posts"
                                        });
                                    };
                                    await User.deleteOne({ username: paramUser });
                                    return res.status(200).json({
                                        ok: true,
                                        message: "User deleted successfully",
                                    });
                                }else{
                                    return res.status(401).json({
                                        ok: false,
                                        message: "Incorrect Password"
                                    });
                                };
                            });
                        }catch(error){
                            console.error(error);
                            return res.status(500).json({
                                message: "An Error Occurred Deleting the User"
                            });
                        };
                    }else if(localRole === "admin"){
                        try{
                            for(let i = 0; i < length; i += 1){
                                await Comment.deleteMany({ from: idsArray[i] });
                            };
                            await Comment.deleteMany({ user: localUser });
                        }catch(error){
                            console.error(error);
                            return res.status(500).json({
                                ok: false,
                                error: "An Error Occurred Deleting the Comments"
                            });
                        };
                        try{
                            await Post.deleteMany({ user: paramUser });
                        }catch(error){
                            console.error(error);
                            return res.status(500).json({
                                ok: false,
                                error: "An Error Occurred Deleting the Posts"
                            });
                        };
                        await User.deleteOne({ username: paramUser });
                        return res.status(200).json({
                            message: "User deleted successfully",
                        });
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