const express = require("express");
const authConroller = require("../controllers/auth.controller");
const router = express.Router();

// Auth routes
router.post("/register", authConroller.registerUser);
router.post("/login", authConroller.loginUser);
router.get("/logout", authConroller.logoutUser);

module.exports = router;
