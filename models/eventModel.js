const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links event to user
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Time stored as "HH:MM"
  category: { type: String, required: true },
  reminder: { type: Boolean, default: false }, // Whether a reminder is set
  reminderTime: { type: Date }, // When to send the reminder
});

module.exports = mongoose.model("Event", EventSchema);
