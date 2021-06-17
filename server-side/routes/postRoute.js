const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  createNewPost,
  getAllPost,
  postById,
  singleUserPost,
  deletePost,
  commentWithPost,
} = require("../controller/postController");

// get all posts --> /post/
router.get("/", getAllPost);
// get a single post --> /post/:id
router.get("/:id", postById);
// get posts for single user --> /post/user
router.post("/user", authMiddleware, singleUserPost);
// create a post route --> /post/
router.post("/", authMiddleware, uploadMiddleware, createNewPost);
// post comment in a post route --> /post/:id
router.post("/:id", authMiddleware, commentWithPost);
// delete a single post --> /post/:id
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
