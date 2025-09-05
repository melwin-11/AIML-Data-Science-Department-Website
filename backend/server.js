const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const labsRoutes = require("./routes/labsRoutes");
const aidsEventsRoutes = require("./routes/aidsEvents");
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// ✅ Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`[${new Date().toISOString()}] Ready for requests`);
});
