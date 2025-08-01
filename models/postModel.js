const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String, // could be a URL or local path
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // reference to the User model
    required: true,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

module.exports = mongoose.model("Post", postSchema, "blogPosts");
