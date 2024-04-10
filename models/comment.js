import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserDetails",
    },
    postId: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
