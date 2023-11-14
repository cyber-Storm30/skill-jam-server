import express from "express";
import {
  createCompany,
  getAllCompanies,
} from "../controllers/insuranceCompany.js";

const router = express.Router();

router.post("/", createCompany);
router.get("/", getAllCompanies);

export default router;
