const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const token = require("../utils/generateToken");
const Post = require("../model/Post");

const registerNewUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists with given email!");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });
  const savedUser = await newUser.save();
  res.status(200).json({
    _id: savedUser._id,
    name: savedUser.username,
    email: savedUser.email,
    token: token(savedUser._id),
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.username,
      bio: user.bio,
      image: user.image,
      bookmark: user.bookmark,
      token: token(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email and Password!");
  }
});

const updateUserInfo = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        image: req.thumbnail,
        bio: req.body.bio,
      },
    },
    { new: true }
  );

  res.json({
    _id: user._id,
    email: user.email,
    name: user.username,
    bio: user.bio,
    image: user.image,
    bookmark: user.bookmark,
    token: token(user._id),
  });
});

const updateWithBookmark = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.body;
  const user = await User.findOne({ _id: id });

  let filteredBookmark = [];
  const find = user.bookmark.find(
    (item) => item.toString() === postId.toString()
  );

  if (find) {
    filteredBookmark = user.bookmark.filter(
      (item) => item.toString() !== postId.toString()
    );
  } else {
    filteredBookmark = [...user.bookmark, postId];
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { $set: { bookmark: filteredBookmark } },
    { new: true }
  );
  res.json({
    _id: updatedUser._id,
    email: updatedUser.email,
    name: updatedUser.username,
    bio: updatedUser.bio,
    image: updatedUser.image,
    bookmark: updatedUser.bookmark,
    token: token(updatedUser._id),
  });
});

const getUserBookmarks = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findOne({ _id: id }).populate("bookmark");
  res.json(user.bookmark);
});

module.exports = {
  registerNewUser,
  loginUser,
  updateUserInfo,
  updateWithBookmark,
  getUserBookmarks,
};
