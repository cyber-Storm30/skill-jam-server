import mongoose from "mongoose";

const discussionsSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      default: "",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Discussions", discussionsSchema);
