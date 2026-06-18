const express = require("express");
const router = express.Router();
const {
  register,
  login,
  passportLogin,
  getCurrentUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const { passportAuthMiddleware } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/passport-login", passportLogin);

// Protected routes (using custom JWT middleware)
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
