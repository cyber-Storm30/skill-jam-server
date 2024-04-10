import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserDetails",
    },
    body: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    pdfLink: {
      type: String,
      default: "",
    },
    likes: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
    categories: {
      type: Array,
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
