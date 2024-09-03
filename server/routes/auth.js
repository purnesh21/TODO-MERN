const express = require("express");
const { login, register, profile } = require("../controller/auth");
const authMiddleware = require("../middlewaare/auth");
const router = express.Router();

// POST /api/v1/auth/login
router.post("/login", login);
// POST /api/v1/auth/register
router.post("/register", register);
// GET /api/v1/auth/profile
router.get("/profile", authMiddleware, profile);

module.exports = router;
