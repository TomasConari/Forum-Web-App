import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const commentControllers = {
    create: async (req, res) => {
        const { text, postTitle } = req.body;
        const { username } = req.user;
        try {
            const newComment = new Comment({
                user: username,
                text,
            });
            const savedComment = await newComment.save();
            const userToUpdate = await User.findOne({ username: username });
            const postToUpdate = await Post.findOne({ title: postTitle });
            if (userToUpdate && postToUpdate) {
                const postIndex = userToUpdate.posts.findIndex(post => post._id.equals(postToUpdate._id));
                if (postIndex !== -1) {
                    userToUpdate.posts[postIndex].comments.push(savedComment);
                    await userToUpdate.save();
                    postToUpdate.comments.push(savedComment);
                    await postToUpdate.save();
                    res.status(201).json({
                        message: 'Comment created and added to post and user',
                        comment: savedComment
                    });
                } else {
                    res.status(404).json({
                        message: 'Post not found in user posts'
                    });
                }
            } else {
                res.status(404).json({
                    message: 'User or post not found'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while creating and adding the comment',
                error: error.message
            });
        }
    },
    update: async (req, res) => {
        const { newText } = req.body;
        const { id } = req.params;
        const { username } = req.user;
        try {
            const commentToUpdate = await Comment.findById(id);

            if (!commentToUpdate) {
                return res.status(404).json({
                    message: 'Comment not found'
                });
            }

            if (commentToUpdate.user !== username) {
                return res.status(403).json({
                    message: 'You do not have permission to update this comment'
                });
            }

            const updatedComment = await Comment.findByIdAndUpdate(id, { text: newText }, { new: true });

            // Update the comment in user's posts
            await User.updateMany(
                { 'posts.comments._id': id },
                { $set: { 'posts.$[].comments.$[inner].text': newText } },
                { arrayFilters: [{ 'inner._id': id }] }
            );

            // Update the comment in post's comments
            await Post.updateMany(
                { 'comments._id': id },
                { $set: { 'comments.$.text': newText } }
            );

            res.status(200).json({
                message: 'Comment updated successfully',
                updatedComment
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while updating the comment',
                error: error.message
            });
        }
    }
};

