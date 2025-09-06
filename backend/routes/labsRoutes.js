const express = require('express');
const Lab = require('../databases/models/Labs');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const labs = await Lab.find();
    res.json(labs);
  } catch (err) {
    console.error("Error fetching labs:", err);
    res.status(500).json({ error: "Failed to fetch labs" });
  }
});

module.exports = router;