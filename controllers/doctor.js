import bcrypt from "bcryptjs";
import DoctorModel from "../models/doctor.js";
import TaskModel from "../models/tasks.js";
import UserModel from "../models/user.js";

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await DoctorModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json("You are not yet registered");
    }
    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(403).json("Wrong credentials");
    } else {
      const newUser = user._doc;
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const doctorSignup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, email, password, major, degree } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new DoctorModel({
      name,
      email: email,
      image: image,
      password: hashedPassword,
      major,
      degree,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const contactDoctor = async (req, res) => {
  try {
    const { doctorId, userId } = req.body;
    const doctor = await DoctorModel.findById(doctorId);
    const user = await UserModel.findById(userId);
    if (!doctor) return res.status(404).json("Doctor does not exist");
    if (!doctor.patients.includes(userId)) {
      await doctor.updateOne({ $push: { patients: userId } });
      await user.updateOne({ $push: { doctors: doctorId } });
      res.status(200).json("Doctor Contacted");
    } else {
      await doctor.updateOne({ $pull: { patients: userId } });
      await user.updateOne({ $pull: { doctors: doctorId } });
      res.status(200).json("Doctor uncontacted");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { doctorId, userId, tasks } = req.body;
    const task = new TaskModel({
      doctorId,
      userId,
      tasks,
    });
    const savedTask = await task.save();
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const viewTaskList = async (req, res) => {
  const { doctorId, userId } = req.body;
  console.log(doctorId, userId);
  try {
    const taskList = await TaskModel.find({
      $and: [
        {
          doctorId: doctorId,
        },
        {
          userId: userId,
        },
      ],
    });
    res.status(200).json(taskList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.id)
      .populate("patients")
      .select("patients");
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
