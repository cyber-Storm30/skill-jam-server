import InsuranceCompany from "../models/insuranceCompany.js";

export const createCompany = async (req, res) => {
  try {
    const newCompany = new InsuranceCompany(req.body);
    const savedCompany = await newCompany.save();
    res.status(200).json(savedCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await InsuranceCompany.find();
    res.status(200).json({ data: companies, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
