import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import path from "path";
import multer from "multer";
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/files", express.static(path.join(__dirname, "/images")));
//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const PORT = 9001;
const MONGO_URL =
  "mongodb+srv://skilljam:skilljam1234@cluster0.20qcj.mongodb.net/mainDB";

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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

mongoose.connect(MONGO_URL, options).then(() => {
  console.log("Database is connected");
});

app.listen(PORT, (req, res) => {
  console.log(`Server connected to ${PORT}`);
});
