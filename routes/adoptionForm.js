import express from "express";
import {
  acceptRequest,
  addForm,
  deleteRequest,
  receivedRequests,
  sentRequests,
} from "../controllers/adoptionForm.js";

const router = express.Router();

router.post("/", addForm);
router.get("/sent/requests/:id", sentRequests);
router.get("/receive/requests/:id", receivedRequests);
router.post("/accept/request/", acceptRequest);
router.post("/delete/request/", deleteRequest);

export default router;
