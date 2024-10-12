const express = require('express');
const router = express.Router();
const Contribution = require('../models/Contribution');
const Project = require("../models/Project");
const authenticateToken = require('../middleware/auth');
const Joi = require('joi');

const contributionSchema = Joi.object({
  projectId: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

router.post("/", authenticateToken, async (req, res) => {
  const { error } = contributionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { projectId, amount } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const newContribution = new Contribution({
      donor: req.user.id,
      project: projectId,
      amount,
    });

    const contribution = await newContribution.save();
    res.status(201).json(contribution);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const contributions = await Contribution.find({ donor: req.user.id })
      .populate("project", "name")
      .populate("donor", "name");
    res.status(200).json(contributions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;