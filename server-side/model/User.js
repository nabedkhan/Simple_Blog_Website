const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    bookmark: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    image: String,
    bio: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
