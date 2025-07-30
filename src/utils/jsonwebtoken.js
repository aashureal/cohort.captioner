const jsonwebtoken = require("jsonwebtoken");
const createToken = (userId) => {
  return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  createToken,
};
