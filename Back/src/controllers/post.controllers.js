import { Post } from "../models/post.model.js";

export const postControllers = {
    create: async (req, res) => {
        const { title, text } = req.body;
        const { username } = req.user;
        try {
            const newPost = new Post({
                user: username,
                title,
                text,
            });
            const savedPost = await newPost.save();
            const updatedUser = await User.findOneAndUpdate({username:username},{ $push: { posts: savedPost } }, { new: true });
            res.status(201).json({
                message: 'Post created and added to user',
                post: savedPost,
                updatedUser
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while creating and creating the post',
                error: error.message
            });
        }
    },
    edit: async (req, res) => {
        const { title } = req.params;
        const newData = req.body;
        try {
            const updatedPost = await Post.findOneAndUpdate({ title: title }, newData, { new: true });
            if (updatedPost === null) {
                return res.status(500).json({ message: "Could not find and update the post" });
            }
            const userToUpdate = await User.findOne({ username: updatedPost.user });
            if (userToUpdate) {
                const postIndex = userToUpdate.posts.findIndex(postId => postId.equals(updatedPost._id));
                if (postIndex !== -1) {
                    userToUpdate.posts[postIndex] = updatedPost;
                    await userToUpdate.save();
                }
            }
            res.status(200).json({ message: "Post Updated", data: updatedPost });
        } catch (error) {
            res.status(500).json({ message: "An error occurred during the update", error: error.message });
        };
    },
    delete: async (req, res) => {
        const { title } = req.body;
        try {
            const deletedPost = await Post.findOneAndDelete({ title: title });
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            const userToUpdate = await User.findOne({ username: deletedPost.user });
            if (userToUpdate) {
                userToUpdate.posts = userToUpdate.posts.filter(postId => !postId.equals(deletedPost._id));
                await userToUpdate.save();
            }
            res.status(200).json({ message: "Post deleted successfully" });
            await Comment.deleteMany({ from: deletedPost._id });
        } catch (error) {
            res.status(500).json({ message: "An error occurred during the delete" });
        };
    },    
    getAll: async (req, res) => {
        try{
            const allPosts = await Post.find();
            res.status(200).json({ 
                data: allPosts
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving posts"
            });
        };
    },
    getOne: async (req, res) => {
        const data = req.body;
        try{
            const post = await Post.findOne(data);
            res.status(200).json({ 
                data: post
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the post"
            });
        };
    }
}