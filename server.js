require("dotenv").config();
// Imports
const app = require("./src/app.js");
const connectToDatabase = require("./src/db/db.js");
const authRouter = require("./src/routes/auth.routes.js");
const postRouter = require("./src/routes/post.routes.js");

connectToDatabase();
// Health Check Route
app.get("/", (req, res) => {
  res.send({ message: "Hello from Server" });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

// Error Handler Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Server Config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
