const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: Boolean, default: false }
});

const Lab = mongoose.model("Lab", labSchema, "labs");
module.exports = Lab;
