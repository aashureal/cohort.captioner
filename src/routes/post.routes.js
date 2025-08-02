const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post.controller");
const protect = require("../middlewares/auth.middleware");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Post routes
router.post("/", protect, upload.single("image"), postController.createPost);

module.exports = router;
