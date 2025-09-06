// routes/facultyDetails.js
const express = require("express");
const router = express.Router();
const Faculty = require("../databases/models/FacultyDetails"); // import your Mongoose model

// GET /api/faculty-details - fetch all faculty members
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ name: 1 }); // sort alphabetically by name
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching faculty details" });
  }
});

module.exports = router;
