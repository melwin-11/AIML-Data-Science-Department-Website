const express = require('express');
const Project = require('../databases/models/Projects');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
