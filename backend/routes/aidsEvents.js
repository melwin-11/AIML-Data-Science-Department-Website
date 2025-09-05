// routes/aidsEvents.js
const express = require("express");
const router = express.Router();
const AidsEvent = require("../databases/models/AidsEvents");

// GET /api/aids-events - fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await AidsEvent.find().sort({ start: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching AIDs events" });
  }
});

module.exports = router;
