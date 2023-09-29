import { Post } from "../models/post.model.js";

export const postControllers = {
    create: async (req, res) => {
        try{
            const { title, text } = req.body;
            const { username } = req.user;
            try{
                const newPost = new Post({
                    user: username,
                    title,
                    text,
                });
                await Post.create(newPost);
                return res.status(201).json({
                    ok: true,
                    message: "Post Created",
                    post: newPost
                });
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    ok: false,
                    error: "Error Creating Post"
                });
            };
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                error: "An Error Ocurred Getting the Body of the Request"
            });
        };
    },
    edit: async (req, res) => {
        try{
            const { id } = req.params;
            const { postUser, title, text } = req.body;
            const { username: localUser, role: localRole } = req.user;
            const newData = {
                title: title,
                text: text
            };
            try{
                if((localUser === postUser) || (localRole === "admin")){
                    try{
                        const updatedPost = await Post.findOneAndUpdate({ _id: id }, newData, { new: true });
                        if(updatedPost === null){
                            return res.status(500).json({
                                ok: false,
                                message: "Could Not Find and Update the Post in Db Sided" 
                            });
                        };
                        return res.status(200).json({
                            ok: true,
                            message: "Post Updated",
                            data: updatedPost
                        });
                    }catch(error){
                        console.log(error);
                        return res.status(500).json({
                            ok: false,
                            message: "An Error Occurred During the Update Api Sided"
                        });
                    };
                }else{
                    throw new Error;
                };
            }catch(error){
                console.log(error);
                return res.status(403).json({
                    ok: false,
                    message: "Action Denied"
                });
            };
        }catch(error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Ocurred Getting the Body of the Request"
            });
        };
    },
    delete: async (req, res) => {
        try{
            const { id, postUser } = req.body;
            const { username: localUser, role: localRole } = req.user;
            try{
                if((localUser === postUser) || (localRole === "admin")){
                    try{
                        const deletedPost = await Post.findOneAndDelete({ _id: id });
                        if(deletedPost === null){
                            return res.status(404).json({
                                ok: false,
                                message: "Post not found" 
                            });
                        };
                        return res.status(200).json({
                            ok: true,
                            message: "Post Deleted"
                        });
                    }catch(error){
                        return res.status(500).json({
                            ok: false,
                            message: "An Error Occurred During the Delete Api Sided" 
                        });
                    };
                }else{
                    throw new Error;
                };
            }catch(error){
                console.log(error);
                return res.status(403).json({
                    ok: false,
                    message: "Action Denied"
                });
            };
        }catch(error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Occurred Getting the Requested Body"
            });
        };
    },    
    getAll: async (req, res) => {
        try{
            const allPosts = await Post.find();
            return res.status(200).json({
                ok: true,
                data: allPosts
            });
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Occurred While Retrieving the Posts"
            });
        };
    },
    getAllByUser: async (req, res) => {
        try{
            const { username } = req.body;
            try{
                const allPosts = await Post.find({ user: username });
                return res.status(200).json({
                    ok: true,
                    data: allPosts
                });
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    ok: false,
                    message: "An Error Occurred While Retrieving the Posts"
                });
            };
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Occurred Getting the Requested Body"
            });
        };
    },
    getOne: async (req, res) => {
        try{
            const { title } = req.body;
            try{
                const post = await Post.findOne({ title: title });
                return res.status(200).json({
                    ok: true,
                    data: post
                });
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    ok: false,
                    message: "An Error Occurred While Retrieving the Post"
                });
            };
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Occurred Getting the Requested Body"
            });
        };
    }
}