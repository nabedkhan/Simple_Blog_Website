const jwt = require("jsonwebtoken");
const token = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });

module.exports = token;
