const Post = require("../models/postModel");

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    console.log(title, body, tags);
    if (!title || !body || !tags)
      return res.json({ message: "Input Valid Data" });
    const newPost = await Post.create({
      title,
      body,
      tags,
      author: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public

const getAllPosts = async (req, res) => {
  try {
    // Extract page and limit from query string. Set default values.
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // Calculate how many items to skip
    const skip = (page - 1) * limit;

    // Fetch total count for info
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate("author", "username email");
    if (!posts) return res.status(404).json("Posts Not Found");
    res.status(200).json({
      page,
      limit,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username"
  );
  if (!post) return res.status(404).json({ message: "Post Not Found" });
  res.status(200).json(post);
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private

const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) return res.status(404).json({ message: "Post Not Found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not Authorized" });

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(403).json({ message: "Post Not Found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not Authorized" });
    await post.deleteOne();
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
