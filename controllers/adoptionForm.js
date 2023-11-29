import AdoptionForm from "../models/adoptionForm.js";
import PetModel from "../models/pets.js";

export const addForm = async (req, res) => {
  try {
    const newForm = new AdoptionForm(req.body);
    const savedForm = await newForm.save();
    res.status(200).json({ data: savedForm, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sentRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const requests = await AdoptionForm.find({
      $or: [
        {
          sender: id,
          requestStatus: "PENDING",
        },
        {
          sender: id,
          requestStatus: "ACCEPTED",
        },
      ],
    })
      .populate("pet")
      .populate("sender")
      .populate("receiver");
    res.status(200).json({ data: requests, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const receivedRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const requests = await AdoptionForm.find({
      $or: [
        {
          receiver: id,
          requestStatus: "PENDING",
        },
        {
          receiver: id,
          requestStatus: "ACCEPTED",
        },
      ],
    })
      .populate("pet")
      .populate("sender")
      .populate("receiver");
    res.status(200).json({ data: requests, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await AdoptionForm.findById(requestId);
    await request.updateOne({ requestStatus: "ACCEPTED" });
    await PetModel.findByIdAndUpdate(request.pet, { isAdopted: true });
    await res.status(200).json({ message: "Request accepted", error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await AdoptionForm.findById(requestId);
    await request.updateOne({ requestStatus: "DELETED" });
    res.status(200).json({ message: "Request accepted", error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
