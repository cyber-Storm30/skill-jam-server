import express from "express";
import {
  createComment,
  createPost,
  deletePost,
  filterPosts,
  getAllPosts,
  getPostComment,
  likePost,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);
router.patch("/", updatePost);
router.delete("/:id", deletePost);
router.get("/", getAllPosts);
router.post("/like", likePost);
router.post("/comment", createComment);
router.get("/comment/:id", getPostComment);
router.post("/filter", filterPosts);

export default router;
