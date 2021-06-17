const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const Post = require("../model/Post");

const createNewPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({
    title,
    description,
    thumbnail: req.thumbnail,
    author: req.user.id,
  });
  const newPost = await post.save();
  res.json(newPost);
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("author").sort({ createdAt: -1 });
  res.json(posts);
});

const postById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate(["author", "comment.user"]);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!");
  }
  res.json(post);
});

const singleUserPost = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const post = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
  if (post.length > 0) {
    res.json(post);
  } else {
    res.json({
      message: "No Post Available Yet",
    });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOneAndRemove({ _id: id });
  const imagePath = path.join(
    `${path.dirname(__dirname)}/uploads/${post.thumbnail}`
  );
  fs.unlink(imagePath, (err) => {
    if (err) {
      throw new Error(err.message);
    }
    res.json({ message: "Post Remove Successfully" });
  });
});

const commentWithPost = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });

  post.comment.push({ user: req.user.id, comment });
  await post.save();
  res.json({ message: "Comment Posted Successfully" });
});

module.exports = {
  createNewPost,
  getAllPost,
  postById,
  singleUserPost,
  deletePost,
  commentWithPost,
};
