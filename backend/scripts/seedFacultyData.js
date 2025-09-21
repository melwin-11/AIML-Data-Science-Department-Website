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

const seedFacultyData = async () => {
  try {
    // Check if faculty user exists, if not create it
    let facultyUser = await UserAuth.findOne({ email: "rekha.v@btech.christuniversity.in" });
    if (!facultyUser) {
      facultyUser = new UserAuth({
        email: "rekha.v@btech.christuniversity.in",
        password: "password123",
        role: "faculty"
      });
      await facultyUser.save();
      console.log("✅ Faculty user created in user_auth");
    } else {
      console.log("✅ Faculty user already exists in user_auth");
    }

    // Check if faculty profile exists, if not create it
    let facultyProfile = await FacultyLms.findOne({ email: "rekha.v@btech.christuniversity.in" });
    if (!facultyProfile) {
      facultyProfile = new FacultyLms({
        name: "Rekha V",
        email: "rekha.v@btech.christuniversity.in",
        allotedClasses: [
          {
            classId: "BTCS-AIML-A",
            subject: "Internet & Web Programming",
            students: [
              {
                studentId: "2362112",
                name: "Melwin Robinson",
                marks: {
                  CIA1: 18,
                  CIA2: 40,
                  CIA3: 0,
                  ESE: 0
                }
              },
              {
                studentId: "2362113",
                name: "Sania Maria Raju",
                marks: {
                  CIA1: 22,
                  CIA2: 38,
                  CIA3: 0,
                  ESE: 0
                }
              },
              {
                studentId: "2362114",
                name: "Tom Wilson",
                marks: {
                  CIA1: 20,
                  CIA2: 42,
                  CIA3: 0,
                  ESE: 0
                }
              }
            ]
          },
          {
            classId: "BTCS-AIML-B",
            subject: "Data Structures and Algorithms",
            students: [
              {
                studentId: "2362115",
                name: "Shawn Luke",
                marks: {
                  CIA1: 25,
                  CIA2: 35,
                  CIA3: 0,
                  ESE: 0
                }
              },
              {
                studentId: "2362116",
                name: "Shawn Joseph",
                marks: {
                  CIA1: 19,
                  CIA2: 41,
                  CIA3: 0,
                  ESE: 0
                }
              }
            ]
          }
        ],
        mentorship: [
          {
            studentId: "2362155",
            name: "Sania Maria Raju",
            progress: {
              academic: "Improved in CIA-3 compared to CIA-1",
              attendance: "85%",
              remarks: "Needs more practice in ReactJS"
            }
          },
          {
            studentId: "2362156",
            name: "Melwin Robinson",
            progress: {
              academic: "Consistent performance across all assessments",
              attendance: "92%",
              remarks: "Excellent problem-solving skills"
            }
          },
          {
            studentId: "2362157",
            name: "Tom Wilson",
            progress: {
              academic: "Shows great potential in algorithm design",
              attendance: "88%",
              remarks: "Should focus more on time management"
            }
          }
        ]
      });

      await facultyProfile.save();
      console.log("✅ Faculty profile created in facultylms");
    } else {
      console.log("✅ Faculty profile already exists in facultylms");
    }

    console.log("🎉 Sample faculty data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding faculty data:", error);
    process.exit(1);
  }
};

seedFacultyData();
