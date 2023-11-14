import mongoose from "mongoose";

const insuranceCompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    eligibilities: {
      type: Array,
      default: [],
    },
    keyBenefits: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("InsuranceCompany", insuranceCompanySchema);
