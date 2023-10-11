import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import hospitalRoutes from "./routes/hospitals.js";
import doctorRoutes from "./routes/doctor.js";
import discussionRoutes from "./routes/discussions.js";
import multer from "multer";
import path from "path";
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/discussion", discussionRoutes);
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

const PORT = 5001;
const MONGO_URL = "mongodb+srv://DGU:Password12!@cluster0.i2b0an9.mongodb.net/";

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options).then(() => {
  console.log("Database is connected");
});

app.listen(PORT, (req, res) => {
  console.log(`Server connected to ${PORT}`);
});
