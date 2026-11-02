import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

const invalidId = (res) => res.status(400).json({ message: "Invalid post ID" });

export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        const status = error.name === "ValidationError" ? 400 : 500;
        return res.status(status).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return res.status(200).json({ count: posts.length, posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!post) return res.status(404).json({ message: "Post not found" });

        return res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        const status = error.name === "ValidationError" ? 400 : 500;
        return res.status(status).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);

        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
