
const JWT = require("../utils/jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ message: "Authentication required. Please log in." });

  try {
    const decoded = JWT.verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

module.exports = isLoggedIn;
