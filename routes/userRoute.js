const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/user", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
