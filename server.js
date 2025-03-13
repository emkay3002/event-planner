const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const authRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const DB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
