import { Comment } from "../models/comment.model.js";

export const commentControllers = {
    create: async (req, res) => {
        try{
            const { id } = req.params;
            const { title, text } = req.body;
            const { localUser } = req.user;
            try{
                const newComment = {
                    user: localUser,
                    title,
                    text,
                    from: id
                };
                await Comment.create(newComment);
                return res.status(201).json({
                    ok: true,
                    message: "Post Created",
                    data: newComment
                });
            }catch(error){
                console.error(error);
                return res.status(500).json({
                    ok: false,
                    error: "Error Creating Comment"
                });
            };
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                error: "Error Getting Body Info"
            });
        };
    },
    update: async (req, res) => {
        try{
            const { id } = req.params;
            const { commentUser, title, text } = req.body;
            const { username: localUser, role: localRole } = req.user;
            const newData = {
                title,
                text
            };
            try{
                if((localUser === commentUser) || (localRole === "admin")){
                    try{
                        const updatedComment = await Comment.findOneAndUpdate({ _id: id }, newData, { new: true });
                        if(updatedComment === null){
                            return res.status(500).json({
                                ok: false,
                                message: "Could Not Find and Update the Comment in Db Side" 
                            });
                        };
                        return res.status(200).json({
                            ok: true,
                            message: "Comment Updated",
                            data: updatedComment
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
            const { id, commentUser } = req.body;
            const { username: localUser, role: localRole } = req.user;
            try{
                if((localUser === commentUser) || (localRole === "admin")){
                    try{
                        const deletedComment = await Comment.findOneAndDelete({ _id: id });
                        if (deletedComment === null) {
                            return res.status(404).json({
                                ok: false,
                                message: "Comment not found"
                            });
                        };
                        return res.status(200).json({
                            ok: true,
                            message: "Comment Deleted"
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
            const allComments = await Comment.find();
            return res.status(200).json({
                ok: true,
                data: allComments
            });
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Occurred While Retrieving the Comments"
            });
        };
    },
    getFrom: async (req, res) => {
        try{
            const { id } = req.params;
            const allComments = await Comment.find({ from: id });
            return res.status(200).json({
                ok: true,
                data: allComments
            });
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Occurred While Retrieving the Comments"
            });
        };
    },
    getOne: async (req, res) => {
        const data = req.body;
        try{
            const comment = await Comment.findOne(data);
            return res.status(200).json({
                ok: true,
                data: comment
            });
        }catch(error){
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "An Error Occurred While Retrieving the Comment"
            });
        };
    }  
};

