const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Placeholder for Login (Fixes the "handler must be a function" error)
router.post("/login", async (req, res) => {
    res.json({ message: "Login route working" });
});

// Placeholder for Register
router.post("/register", async (req, res) => {
    res.json({ message: "Register route working" });
});

// CRITICAL LINE: Without this, server.js line 15 will ALWAYS crash
module.exports = router;