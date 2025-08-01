const express = require("express");
const postValidationRules = require("../validators/postValidator");
const validate = require("../middleWares/postMiddleware");
const authMiddleware = require("../middleWares/authMiddleware");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/api/posts", getAllPosts);
router.get("/api/posts/:id", getPostById);
router.post(
  "/api/posts",
  authMiddleware,
  postValidationRules,
  validate,
  createPost
);
router.put("/api/posts/:id", authMiddleware, updatePost);
router.delete("/api/posts/:id", authMiddleware, deletePost);

module.exports = router;
