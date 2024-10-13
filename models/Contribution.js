const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be greater than 0"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contribution', ContributionSchema);