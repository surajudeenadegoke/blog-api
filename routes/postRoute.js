const express = require("express");
const postValidationRules = require("../validators/postValidator");
const validate = require("../middleWares/postMiddleware");
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/post", getPosts);
router.get("/post/:id", getPostById);
router.post("/post", postValidationRules, validate, createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;
