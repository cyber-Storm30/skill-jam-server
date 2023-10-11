import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
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
    patients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    degree: {
      type: String,
      default: "",
    },
    major: {
      type: String,
      default: "",
    },
    isDoctor: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
