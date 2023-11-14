import PetModel from "../models/pets.js";
import AdoptionForm from "../models/adoptionForm.js";

export const createPet = async (req, res) => {
  try {
    const newPet = new PetModel(req.body);
    const savedPet = await newPet.save();
    res.status(200).json(savedPet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editPet = async (req, res) => {
  try {
    const { petId } = req.params;
    const pet = await PetModel.findById(petId);
    if (!pet) {
      return res.status(404).json("Pet not found");
    }
    await pet.updateOne({ $set: req.body });
    res.status(200).json("Pet succesfully updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPet = async (req, res) => {
  try {
    const pets = await PetModel.find().populate("userId");
    res.status(200).json({ data: pets, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id);
    res.status(200).json({ data: pet, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserPets = async (req, res) => {
  try {
    const pet = await PetModel.find({ userId: req.params.id }).populate(
      "userId"
    );
    res.status(200).json({ data: pet, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const checkAdoptionRequestStatus = async (req, res) => {
  try {
    const { sender, pet } = req.body;
    const isRequestSent = await AdoptionForm.findOne({
      $and: [
        {
          sender: sender,
        },
        {
          pet: pet,
        },
      ],
    });
    console.log(isRequestSent);
    if (isRequestSent) {
      return res.status(200).json({ message: "Request present", error: false });
    } else {
      return res
        .status(404)
        .json({ message: "No requerst found", error: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
