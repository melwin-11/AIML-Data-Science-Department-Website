const express = require('express');
const Lab = require('../databases/models/Labs');
const router = express.Router();

router.get('/', async (req, res) => {
  const labs = await Lab.find();
  res.json(labs);
});

module.exports = router;