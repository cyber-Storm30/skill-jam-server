import express from "express";
import {
  contactDoctor,
  createTask,
  doctorLogin,
  doctorSignup,
  getAllDoctors,
  getPatients,
  viewTaskList,
} from "../controllers/doctor.js";

const router = express.Router();

router.post("/login", doctorLogin);
router.post("/signup", doctorSignup);
router.get("/", getAllDoctors);
router.post("/contact", contactDoctor);
router.post("/create/task", createTask);
router.post("/view/tasks", viewTaskList);
router.get("/patients/:id", getPatients);

export default router;
