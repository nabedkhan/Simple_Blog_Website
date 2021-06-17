const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  registerNewUser,
  loginUser,
  updateUserInfo,
  updateWithBookmark,
  getUserBookmarks,
} = require("../controller/userController");

// get user bookmarks route --> /auth/bookmark
router.get("/bookmark", authMiddleware, getUserBookmarks);
// update user route --> /auth/
router.put("/", authMiddleware, uploadMiddleware, updateUserInfo);
// update user with bookmarks --> /auth/bookmark
router.put("/bookmark", authMiddleware, updateWithBookmark);
// login user route --> /auth/login
router.post("/login", loginUser);
// register new user route --> /auth/register
router.post("/register", registerNewUser);

module.exports = router;
