import express from "express";
import {
  checkAdoptionRequestStatus,
  createPet,
  editPet,
  getAllPet,
  getPetById,
  getUserPets,
} from "../controllers/pets.js";

const router = express.Router();

router.post("/", createPet);
router.post("/edit/:petId", editPet);
router.get("/", getAllPet);
router.get("/:id", getPetById);
router.get("/user/:id", getUserPets);
router.post("/check/request/status", checkAdoptionRequestStatus);

export default router;
