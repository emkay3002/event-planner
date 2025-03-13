const express = require("express");
const { createEvent } = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

// Route to create an event
router.post("/create", authMiddleware, createEvent);

module.exports = router;
