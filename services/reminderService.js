const cron = require("node-cron");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const { sendReminderEmail } = require("../utils/emailService");

const checkReminders = async () => {
  try {
    const now = new Date();

    // Find events with reminders set that are due in the next 5 minutes
    const events = await Event.find({
      reminder: true,
      reminderTime: { $lte: new Date(now.getTime() + 5 * 60 * 1000) },
    });

    for (const event of events) {
      const user = await User.findById(event.user);
      if (user) {
        await sendReminderEmail(user.email, event);
      }
    }
  } catch (error) {
    console.error("Error checking reminders:", error);
  }
};

// Run every minute to check for reminders
cron.schedule("* * * * *", checkReminders);
