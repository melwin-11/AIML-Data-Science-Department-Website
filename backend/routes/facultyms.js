const express = require("express");
const FacultyLms = require("../databases/models/facultyLms");

const router = express.Router();

// Get faculty profile
router.get("/profile", async (req, res) => {
  try {
    const email = req.user?.email; // assuming auth middleware sets req.user
    const faculty = await FacultyLms.findOne({ email });
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student marks
router.put("/update-marks", async (req, res) => {
  const { classId, studentId, marks } = req.body;
  try {
    const faculty = await FacultyLms.findOneAndUpdate(
      { "allotedClasses.classId": classId, "allotedClasses.students.studentId": studentId },
      { $set: { "allotedClasses.$[c].students.$[s].marks": marks } },
      { arrayFilters: [{ "c.classId": classId }, { "s.studentId": studentId }], new: true }
    );
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update mentorship progress
router.put("/update-mentorship", async (req, res) => {
  const { studentId, progress } = req.body;
  try {
    const faculty = await FacultyLms.findOneAndUpdate(
      { "mentorship.studentId": studentId },
      { $set: { "mentorship.$.progress": progress } },
      { new: true }
    );
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
