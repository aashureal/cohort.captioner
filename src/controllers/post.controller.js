const Post = require("../models/post.model");
const User = require("../models/user.model");

const imagekit = require("../utils/imagekit");

const { generateCaptionWithTags } = require("../service/ai.service");

const createPost = async (req, res) => {
  try {
    // User check
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (!req.file)
      return res.status(400).json({ message: "Image is required." });

    //  ImageKit upload
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "cohort-captioner",
    });

    // Generate caption with Gemini AI
    // const caption = await generateCaptionWithTags(req.file.buffer);
    const caption = await generateCaptionWithTags(
      req.file.buffer,
      req.file.mimetype
    );

    // Create new Post with AI-generated caption
    const newPost = new Post({
      image: uploadResponse.url,
      caption,
      user: req.user.id,
    });
    await newPost.save();

    // Add post to user profile
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({
      message: "Post created successfully.",
      post: newPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post.", error: error.message });
  }
};

module.exports = {
  createPost,
};
