const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema({
  src: { type: String, required: true },
  fallback: { type: String, required: true }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  progress: { type: Number, required: true },
  contributors: { type: [contributorSchema], default: [] }
});

const Project = mongoose.model("Project", projectSchema, "projects");
module.exports = Project;
