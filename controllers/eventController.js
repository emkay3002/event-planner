const Event = require("../models/eventModel");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time, category, reminder, reminderTime } =
      req.body;

    const event = new Event({
      user: req.user, // Ensures the event is linked to the logged-in user
      name,
      description,
      date,
      time,
      category,
      reminder,
      reminderTime,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
