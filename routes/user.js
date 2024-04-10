import express from "express";
import {
  deleteAccount,
  editUserDetails,
  forgotPassword,
  getReviews,
  getUserDataById,
  getUserPosts,
  login,
  saveUserForm,
  sendReview,
  signup,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/save/form", saveUserForm);
router.post("/edit/form", editUserDetails);
router.post("/delete/", deleteAccount);
router.get("/:id", getUserDataById);
router.post("/reset/password", forgotPassword);
router.post("/review", sendReview);
router.get("/get/review", getReviews);
router.get("/posts/:id", getUserPosts);

export default router;
