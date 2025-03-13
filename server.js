const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./services/reminderService");
const DB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;
// Import routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/events", eventRoutes);

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

if (process.env.NODE_ENV !== "test") {
  // Prevent starting the server in test mode
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export app for Jest
