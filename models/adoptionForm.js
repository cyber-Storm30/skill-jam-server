import mongoose from "mongoose";

const adoptionForm = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    requestStatus: {
      type: String,
      default: "PENDING",
    },
    name: {
      type: String,
      default: "NIL",
    },
    address: {
      type: String,
      default: "NIL",
    },
    city: {
      type: String,
      default: "NIL",
    },
    state: {
      type: String,
      default: "NIL",
    },
    zipCode: {
      type: String,
      default: "NIL",
    },
    email: {
      type: String,
      default: "NIL",
    },
    phone: {
      type: String,
      default: "NIL",
    },
    isRentHome: {
      type: String,
      default: "NIL",
    },
    landlordNumber: {
      type: String,
      default: "NIL",
    },
    isPetFriendly: {
      type: String,
      default: "NIL",
    },
    isYard: {
      type: String,
      default: "NIL",
    },
    isYardFenched: {
      type: String,
      default: "NIL",
    },
    activityLevel: {
      type: String,
      default: "NIL",
    },
    hourAlonePet: {
      type: String,
      default: "NIL",
    },
    childrenAge: {
      type: String,
      default: "NIL",
    },
    isOtherPet: {
      type: String,
      default: "NIL",
    },
    otherPetAge: {
      type: String,
      default: "NIL",
    },
    otherPetBreed: {
      type: String,
      default: "NIL",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionForm", adoptionForm);
