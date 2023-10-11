import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      default: "",
    },
    disease: {
      type: Array,
      default: [],
    },
    doctors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Doctor",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
