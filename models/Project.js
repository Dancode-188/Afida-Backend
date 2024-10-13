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
    minlength: [2, "Category must be at least 2 characters long"],
    maxlength: [50, "Category cannot exceed 50 characters"],
    set: (v) => v.toLowerCase(),
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

ProjectSchema.pre("save", function (next) {
  if (this.isModified("category")) {
    this.category = this.category.toLowerCase();
  }
  next();
});

module.exports = mongoose.model("Project", ProjectSchema);
