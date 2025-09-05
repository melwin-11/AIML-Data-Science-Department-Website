const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const authenticateToken = require("../middleware/auth");
const UserAuth = require("../databases/models/UserAuth");
const StudentProfile = require("../databases/models/StudentProfile");

const router = express.Router();

// 🔑 Login Route
router.post("/login", async (req, res) => {
  console.log("POST /login body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const user = await UserAuth.findOne({ email }).exec();
    console.log("Database query returned:", user);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = { email: user.email, id: user._id };

    if (!config.jwtSecret) {
      return res.status(500).json({ error: "Server config error" });
    }

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("--- ERROR DURING LOGIN ---", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 👤 Profile Route (Protected)
router.get("/profile", authenticateToken, async (req, res) => {
  console.log("GET /profile with user:", req.user);
  try {
    const profile = await StudentProfile.findOne({ email: req.user.email }).exec();
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
