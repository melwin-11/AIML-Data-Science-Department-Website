const mongoose = require("mongoose");

const AidsEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  allDay: { type: Boolean, default: true },
  description: { type: String },
});

module.exports = mongoose.model(
  "AidsEvent",
  AidsEventSchema,
  "aids_events"
);
