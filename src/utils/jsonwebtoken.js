const jsonwebtoken = require("jsonwebtoken");
const createToken = (userId) => {
  return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createToken,
  verifyToken,
};
