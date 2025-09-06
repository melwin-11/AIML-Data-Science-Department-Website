const mongoose = require("mongoose");

// Define schema for faculty_details collection
const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  Cubicle: {
    type: String,
    default: "",
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    default: "",
  },
});

// Bind schema to faculty_details collection
const Faculty = mongoose.model("faculty_details", facultySchema, "faculty_details");
module.exports = Faculty;
