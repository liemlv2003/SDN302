const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/bookings", bookingController.getAllBookings);
router.post("/bookings", bookingController.createBooking);
router.put("/bookings/:bookingId", bookingController.updateBooking);
router.delete("/bookings/:bookingId", bookingController.deleteBooking);

module.exports = router;
