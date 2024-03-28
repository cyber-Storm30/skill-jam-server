import User from "../models/user.js";
import UserDetails from "../models/userDetails.js";
import ReviewModel from "../models/reviews.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const userDetails = await UserDetails.findOne({ userId: user?._id });
    if (!user) {
      return res.status(404).json("You are not yet registered");
    }
    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(403).json("Wrong credentials");
    } else {
      const newUser = user._doc;
      res.status(200).json({ user: user, userDetails: userDetails });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(403).json("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email,
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
    const user = new UserDetails(req.body);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
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

export const editUserDetails = async (req, res) => {
  try {
    const { userDetailsId, name, mobile, hobbies, job, collage } = req.body;
    const userDetails = await UserDetails.findById(userDetailsId);
    if (!userDetails) {
      return res.status(404).json("User not found");
    }
    const newData = await UserDetails.findByIdAndUpdate(
      userDetailsId,
      {
        name,
        mobile,
        hobbies,
        job,
        collage,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ data: newData, message: "Data updated", error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const userDetails = await UserDetails.findOne({ userId: user?._id });
    if (!userDetails) {
      return res.status(404).json("User details not found");
    }
    await UserDetails.findByIdAndDelete(userDetails?._id);
    await User.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ message: "User successfully deleted", error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    const savedUser = await user.save();
    if (savedUser) {
      res.status(200).json({ message: "New password created", error: false });
    }
  } catch (err) {
    res.status(200).json({
      message: "Error occurs while creating new password",
      error: true,
    });
  }
};

export const sendReview = async (req, res) => {
  try {
    const newReview = new ReviewModel(req.body);
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .sort({ createdAt: -1 })
      .populate("userId");
    res.status(200).json({ data: reviews, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
