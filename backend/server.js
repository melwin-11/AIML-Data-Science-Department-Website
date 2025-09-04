const path = require('path');
require('dotenv').config()
const mongoose = require('mongoose');

// Defining schema to match your MongoDB document structure
const FacultyDetailsSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  department: String // add if present in your DB
}, { collection: 'faculty_details' }); // <-- Explicit collection name

// Creating the model, binding to the actual collection name
const FacultyDetails = mongoose.model('FacultyDetails', FacultyDetailsSchema, 'faculty_details'); // third param enforces collection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("Connection success!");
  // Find and project only name and specialization fields
  const result = await FacultyDetails.find({}, { name: 1, specialization: 1, _id: 0 });
  console.log("Faculty:", result);

  mongoose.disconnect();
})
.catch(err => console.error("Connection error:", err));
