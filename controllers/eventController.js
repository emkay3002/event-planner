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

// Get user-specific events with sorting and filtering
exports.getEvents = async (req, res) => {
  try {
    const { sortBy, category, reminderStatus } = req.query; // Extract query parameters
    let filter = { user: req.user }; // Ensure only user-specific events are fetched

    // Apply category filter if provided
    if (category) {
      filter.category = category;
    }

    // Apply reminder status filter if provided
    if (reminderStatus === "true") {
      filter.reminder = true;
    } else if (reminderStatus === "false") {
      filter.reminder = false;
    }

    // Define sorting logic
    let sortOptions = {};
    if (sortBy === "date") {
      sortOptions.date = 1; // Ascending order
    } else if (sortBy === "category") {
      sortOptions.category = 1; // Alphabetical order
    }

    // Fetch and sort events
    const events = await Event.find(filter).sort(sortOptions);
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
