import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        about: {
          type: String,
          required: true,
        },
        event: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      }
);


const Post = mongoose.model("Post", postSchema);

export default Post;
