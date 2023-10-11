import express from "express";
import {
  getUserDataById,
  login,
  saveUserForm,
  signup,
  taskDone,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/save/form", saveUserForm);
router.get("/:id", getUserDataById);
router.post("/task/done", taskDone);

export default router;
