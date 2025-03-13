const express = require("express");
const { createEvent, getEvents } = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

// Route to create an event
router.post("/create", authMiddleware, createEvent);
router.get("/view", authMiddleware, getEvents);
module.exports = router;
