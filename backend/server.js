const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const FacultyDetailsSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  // add other fields as needed
});

const FacultyDetails = mongoose.model('FacultyDetails', FacultyDetailsSchema);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("Connection success!");

  // Retrieve name and specialization
  const result = await FacultyDetails.find({}, "name specialization");
  console.log("Faculty:", result);

  mongoose.disconnect();
})
.catch(err => console.error("Connection error:", err));
