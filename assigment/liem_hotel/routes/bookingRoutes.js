const express = require("express");
const { createBooking, cancelBooking, getBookings, getBookingsByDate } = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.delete("/:bookingId", authMiddleware, cancelBooking);
router.get("/", authMiddleware, getBookings);
router.get("/bookingsByDate", authMiddleware, getBookingsByDate);

module.exports = router;
