import DiscussionModel from "../models/discussions.js";

export const createDiscussion = async (req, res) => {
  try {
    const { sender, receiver, body } = req.body;
    const discussion = new DiscussionModel({
      sender,
      receiver,
      body,
    });
    const savedDiscussion = await discussion.save();
    res.status(200).json(savedDiscussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDiscussion = async (req, res) => {
  try {
    const discussion = await DiscussionModel.find({
      $or: [
        {
          $and: [
            {
              sender: req.body.sender,
            },
            {
              receiver: req.body.receiver,
            },
          ],
        },
        {
          $and: [
            {
              sender: req.body.receiver,
            },
            {
              receiver: req.body.sender,
            },
          ],
        },
      ],
    });
    res.status(200).json(discussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
