import User from "../models/user.js";
import bcrypt from "bcryptjs";
import TasksModel from "../models/tasks.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
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

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, image, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email: email,
      image: image,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveUserForm = async (req, res) => {
  try {
    const { disease, userId, document } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    await user.updateOne({ disease: disease, document: document });
    res.status(200).json("User disease updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("doctors");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const taskDone = async (req, res) => {
  try {
    const { taskId, tasks, singleTaskId } = req.body;
    const task = await TasksModel.findById(taskId);
    if (!task) {
      return res.status(404).json("Task not found");
    }
    await task.updateOne({ tasks: tasks });
    res.status(200).json("Task updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
