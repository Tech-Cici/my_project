const express = require("express");

const router = express.Router();

const Booking = require("../models/Booking");

// Create a new booking
router.post("/", async (req, res) => {
  const { destination, departureDate, returnDate, numTravelers } = req.body;

  const newBooking = new Booking({
    destination,
    departureDate,
    returnDate,
    numTravelers,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings (optional)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
