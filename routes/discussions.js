import express from "express";
import { createDiscussion, getDiscussion } from "../controllers/discussions.js";

const router = express.Router();

router.post("/create", createDiscussion);
router.post("/get", getDiscussion);

export default router;
