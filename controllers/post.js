import PostModel from "../models/post.js";
import CommentModel from "../models/comment.js";

export const createPost = async (req, res) => {
  try {
    const post = new PostModel(req.body);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const extractNames = (items) => {
  let newArray = [];
  items.forEach((item) => {
    if (item.isSelected === true) {
      newArray.push(item);
    }
  });
  return newArray;
};

export const filterPosts = async (req, res) => {
  try {
    const filteredArray = extractNames(req.body.categories);
    if (filteredArray.length === 0) {
      const posts = await PostModel.find()
        .populate("userId")
        .sort({ createdAt: -1 });
      return res.status(200).json({ data: posts });
    }
    const posts = await PostModel.find({
      categories: {
        $elemMatch: {
          $or: filteredArray,
        },
      },
    })
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const updates = req.body;

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: updates },
      {
        new: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.body.postId);
    if (!post) {
      res.status(404).json("Post not found");
    }
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("LIKED");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json("DISLIKED");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const post = await PostModel.findById(req.body.postId);
    if (!post) {
      res.status(200).json("Post not found");
    }
    const comment = new CommentModel(req.body);
    const savedComment = await comment.save();
    await savedComment.populate("userId");
    await post.updateOne({ $push: { comments: savedComment._id } });
    res.status(200).json({ data: savedComment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostComment = async (req, res) => {
  try {
    const comments = await CommentModel.find({
      postId: req.params.id,
    })
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
