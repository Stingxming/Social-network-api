const { User, Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: userData.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // add reaction to a thought
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a reaaction from a thought
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
