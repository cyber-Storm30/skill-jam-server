import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: "",
    },
    tasks: [
      {
        isCompleted: {
          type: Boolean,
          default: false,
        },
        desc: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Tasks", taskSchema);
