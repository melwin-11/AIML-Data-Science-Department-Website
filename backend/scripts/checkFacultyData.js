const mongoose = require("mongoose");
const config = require("../config/config");
const UserAuth = require("../databases/models/UserAuth");
const FacultyLms = require("../databases/models/facultyLms");

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const checkFacultyData = async () => {
  try {
    // Check faculty user in user_auth collection
    const facultyUser = await UserAuth.findOne({ email: "rekha.v@btech.christuniversity.in" });
    console.log("Faculty user in user_auth:", facultyUser);

    // Check faculty profile in facultylms collection
    const facultyProfile = await FacultyLms.findOne({ email: "rekha.v@btech.christuniversity.in" });
    console.log("Faculty profile in facultylms:", facultyProfile);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error checking faculty data:", error);
    process.exit(1);
  }
};

checkFacultyData();
