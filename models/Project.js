const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ["Technology", "Art", "Science", "Other"],
      message: "{VALUE} is not a valid category",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  targetAmount: {
    type: Number,
    required: true,
    min: [1, "Target amount must be greater than 0"],
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);