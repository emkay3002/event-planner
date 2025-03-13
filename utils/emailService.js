const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendReminderEmail = async (email, event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Reminder: ${event.name} is coming up!`,
    text: `Hello,\n\nDon't forget about your event: "${event.name}" happening on ${event.date} at ${event.time}.\n\nEvent Details:\n${event.description}\n\nCategory: ${event.category}\n\n- Your Event Planner`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to ${email} for event: ${event.name}`);
  } catch (error) {
    console.error("Failed to send reminder:", error);
  }
};
