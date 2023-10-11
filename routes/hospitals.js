import express from "express";
import { createHospital, getAllHospitals } from "../controllers/hospitals.js";

const router = express.Router();

router.post("/", createHospital);
router.get("/", getAllHospitals);

export default router;
