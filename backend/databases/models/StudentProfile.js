const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  registerNumber: { type: String, required: true },
  attendanceChartData: [
    {
      Semester: String,
      Attendance: Number,
    },
  ],
  gradesChartData: [
    {
      Semester: String,
      CGPA: Number,
    },
  ],
  currentSemesterAttendance: [
    {
      Course: String,
      TotalClassesPresent: Number,
      TotalClassesConducted: Number,
      Attendance: String,
    },
  ],
  currentSemesterGrades: [
    {
      Course: String,
      CIA_1: Number,
      MSE: Number,
      CIA_3: String,
    },
  ],
});

module.exports = mongoose.model(
  "StudentProfile",
  StudentProfileSchema,
  "student_profiles"
);
