const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authenticateToken = require("../middleware/auth");
const Joi = require("joi");

const projectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  targetAmount: Joi.number().positive().required(),
});

router.post("/", authenticateToken, async (req, res) => {
  const { error } = projectSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, description, category, targetAmount } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      category,
      targetAmount,
      organizer: req.user.id,
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("organizer", "name email");
    res.status(200).json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
