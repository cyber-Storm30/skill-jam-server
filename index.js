import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import petRoutes from "./routes/pets.js";
import insuranceCompanyRoutes from "./routes/insuranceCompany.js";
import adoptionFormRoutes from "./routes/adoptionForm.js";

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/company", insuranceCompanyRoutes);
app.use("/api/form", adoptionFormRoutes);

const PORT = 5001;
const MONGO_URL =
  "mongodb+srv://babairanajit:qAjjZoOFCe4nJAIr@cluster0.edh6m0x.mongodb.net/";

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
