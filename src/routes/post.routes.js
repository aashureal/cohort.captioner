const express = require("express");
const multer = require("multer");
const isLoggedIn = require("../middlewares/isLoggedIn");
const postController = require("../controllers/post.controller");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Post routes
router.post("/", isLoggedIn, upload.single("image"), postController.createPost);

module.exports = router;
