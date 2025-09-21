import mongoose from "mongoose";

const MarksSchema = new mongoose.Schema({
  CIA1: Number,
  CIA2: Number,
  CIA3: Number,
  ESE: Number,
});

const StudentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  marks: MarksSchema,
});

const AllotedClassSchema = new mongoose.Schema({
  classId: String,
  subject: String,
  students: [StudentSchema],
});

const MentorshipSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  progress: {
    academic: String,
    attendance: String,
    remarks: String,
  },
});

const FacultyLmsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  allotedClasses: [AllotedClassSchema],
  mentorship: [MentorshipSchema],
});

export default mongoose.model("FacultyLms", FacultyLmsSchema,"facultylms");
