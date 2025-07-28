const posts = require("../models/postModel");

//Get All Posts
const getPosts = (req, res) => {
  res.status(200).json(posts);
};
// Get Single Post
const getPostById = (req, res) => {
  const postId = parseInt(req.params.id);
  const myPost = posts.find((post) => post.id === postId);
  if (!myPost) return res.status(404).json({ message: "Post Not Found" });
  res.json(myPost);
};
//Create Post
const createPost = (req, res) => {
  let postId = posts.length + 1;
  const { title, content, author } = req.body;
  if (!title || !content || !author)
    return res.json({ message: "Input Valid Data" });
  const newPost = { id: postId, title, content, author };
  posts.push(newPost);
  res.status(201).json(newPost);
};
//Update Post

const updatePost = (req, res) => {
  const postId = parseInt(req.params.id);
  let myPost = posts.find((post) => post.id === postId);
  if (!myPost) return res.status(404).json({ message: "Post Not Found" });
  const { title, content, author } = req.body;
  if (!title || !content || !author)
    return res.json({ message: "Input Valid Data" });
  myPost.title = title || myPost.title;
  myPost.content = content || myPost.content;
  myPost.author = author || myPost.author;
  res.json({ message: "post updated", myPost });
};

//Delete Post
const deletePost = (req, res) => {
  let postId = parseInt(req.params.id);

  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex == -1) return res.status(404).json("Post Not Found");
  const deletedPost = posts.splice(postIndex, 1);

  res.json({
    message: `Post with id:${postId} deleted`,
    deleted: deletedPost[0],
  });
};
module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };