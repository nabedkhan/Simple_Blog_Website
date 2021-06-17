const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid or Expired token");
  }
};

module.exports = authMiddleware;
