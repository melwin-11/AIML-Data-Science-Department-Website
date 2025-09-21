const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const authenticateToken = require("../middleware/auth");
const UserAuth = require("../databases/models/UserAuth");
const FacultyLms = require("../databases/models/facultyLms");

const router = express.Router();

// Faculty Login Route
router.post("/login", async (req, res) => {
  console.log("POST /api/faculty/login body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    // First check if user exists in user_auth collection
    const user = await UserAuth.findOne({ email }).exec();
    console.log("Database query returned:", user);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials or faculty profile not found." });
    }

    // Check if faculty profile exists in facultylms collection
    const faculty = await FacultyLms.findOne({ email }).exec();
    if (!faculty) {
      return res.status(401).json({ error: "Invalid credentials or faculty profile not found." });
    }

    const payload = { email: user.email, id: user._id, role: "faculty" };

    if (!config.jwtSecret) {
      return res.status(500).json({ error: "Server config error" });
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("--- ERROR DURING FACULTY LOGIN ---", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get faculty profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const email = req.user?.email;
    const faculty = await FacultyLms.findOne({ email });
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student marks
router.patch("/update-marks", authenticateToken, async (req, res) => {
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
router.patch("/update-mentorship", authenticateToken, async (req, res) => {
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
