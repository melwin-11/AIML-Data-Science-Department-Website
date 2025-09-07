const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const labsRoutes = require("./routes/labsRoutes");
const aidsEventsRoutes = require("./routes/aidsEvents");
const projectsRoutes = require("./routes/projects");
const facultyDetailsRoutes = require("./routes/facultyDetails");
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://aiml-data-science-department-websit.vercel.app",
    credentials: true,
  })
);

// ✅ Connect to MongoDB
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/labs", labsRoutes);
app.use("/aids-events", aidsEventsRoutes);
app.use("/projects", projectsRoutes);
app.use("/faculty-details", facultyDetailsRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// ✅ Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`[${new Date().toISOString()}] Ready for requests`);
});

// No changes needed if /aids-events is already mounted and CORS is enabled for frontend
