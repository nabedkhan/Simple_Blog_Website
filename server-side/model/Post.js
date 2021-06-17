const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
module.exports = Post;
