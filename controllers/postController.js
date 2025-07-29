const Posts = require("../models/postModel");

//Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
// Get Single Post
const getPostById = async (req, res) => {
  const post = await Posts.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post Not Found" });
  res.status(200).json(post);
};
//Create New Post
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author)
      return res.json({ message: "Input Valid Data" });
    const newPost = new Posts({ title, content, author });
    newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
//Update Post

const updatePost = async (req, res) => {
  let updatedPost = await Posts.findByIdAndUpdate(req.params.id);
  if (!updatedPost) return res.status(404).json({ message: "Post Not Found" });
  const { title, content, author } = req.body;
  if (!title || !content || !author)
    return res.json({ message: "Input Valid Data" });
  updatedPost.title = title || updatedPost.title;
  updatedPost.content = content || updatedPost.content;
  updatedPost.author = author || updatedPost.author;
  res.status(200).json(updatedPost);
};

//Delete Post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post Not Found", error });
    res.status(200).json({ deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
