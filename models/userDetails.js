import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    collage: {
      type: String,
      default: "",
    },
    job: {
      type: String,
      default: "",
    },
    hobbies: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserDetails", userDetailsSchema);
