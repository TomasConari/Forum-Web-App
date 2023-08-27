import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const commentControllers = {
    create: async (req, res) => {
        const { id, paramsUsername } = req.params;
        const { text } = req.body;
        const { userUsername } = req.user;
        try{
            const newComment = new Comment({
                user: userUsername,
                text,
                from: id
            });
            const savedComment = await newComment.save();
            const userToUpdate = await User.findOne({ username: paramsUsername });
            const postToUpdate = await Post.findById(id);
            if(userToUpdate && postToUpdate){
                const postIndex = userToUpdate.posts.findIndex(post => post._id.equals(postToUpdate._id));
                if(postIndex !== -1){
                    userToUpdate.posts[postIndex].comments.push(savedComment);
                    await userToUpdate.save();
                    postToUpdate.comments.push(savedComment);
                    await postToUpdate.save();
                    res.status(201).json({
                        message: 'Comment created and added to post and user',
                        comment: savedComment
                    });
                }else{
                    res.status(404).json({
                        message: 'Post not found in user posts'
                    });
                };
            }else{
                res.status(404).json({
                    message: 'User or post not found'
                });
            };
        }catch(error){
            res.status(500).json({
                message: 'An error occurred while creating and adding the comment',
                error: error.message
            });
        };
    },
    update: async (req, res) => {
        const { newText } = req.body;
        const { id } = req.params;
        const { username } = req.user;
        try {
            const commentToUpdate = await Comment.findById(id);
            if(!commentToUpdate){
                return res.status(404).json({
                    message: 'Comment not found'
                });
            };
            if (commentToUpdate.user !== username) {
                return res.status(403).json({
                    message: 'You do not have permission to update this comment'
                });
            };
            const updatedComment = await Comment.findByIdAndUpdate(id, { text: newText }, { new: true });
            await User.updateMany(
                { 'posts.comments._id': id },
                { $set: { 'posts.$[].comments.$[inner].text': newText } },
                { arrayFilters: [{ 'inner._id': id }] }
            );
            await Post.updateMany(
                { 'comments._id': id },
                { $set: { 'comments.$.text': newText } }
            );
            res.status(200).json({
                message: 'Comment updated successfully',
                updatedComment
            });
        }catch(error){
            res.status(500).json({
                message: 'An error occurred while updating the comment',
                error: error.message
            });
        };
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedComment = await Comment.findByIdAndDelete(id);
            if (!deletedComment) {
                return res.status(404).json({ message: "Comment not found" });
            };
            const userToUpdate = await User.findOne({ username: deletedComment.user });
            if (userToUpdate) {
                userToUpdate.posts.forEach((post) => {
                    post.comments = post.comments.filter((comment) => !comment.equals(deletedComment._id));
                });
                await userToUpdate.save();
            }
            await Post.updateMany(
                { 'comments._id': deletedComment._id },
                { $pull: { comments: { _id: deletedComment._id } } }
            );
            res.status(200).json({ message: "Comment deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "An error occurred during the delete" });
        }
    },
    getAll: async (req, res) => {
        try{
            const allComments = await Comment.find();
            res.status(200).json({ 
                data: allComments
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the comments"
            });
        };
    },
    getOne: async (req, res) => {
        const data = req.body;
        try{
            const comment = await Comment.findOne(data);
            res.status(200).json({ 
                data: comment
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the comment"
            });
        };
    }  
};

