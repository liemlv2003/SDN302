const Booking = require("../models/bookingModel");
const User = require("../models/userModel");


const isRoomAvailable = async (roomId, checkInDate, checkOutDate) => {
  const existingBooking = await Booking.findOne({
    roomId,
    status: { $ne: "cancelled" }, 
    $or: [
      { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
    ]
  });
  return !existingBooking;
};

exports.createBooking = async (req, res) => {
  try {
    if (req.user.role !== "customer") return res.status(403).json({ message: "Access denied" });

    const { roomId, checkInDate, checkOutDate } = req.body;

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({ message: "checkInDate must be before checkOutDate" });
    }

    const available = await isRoomAvailable(roomId, checkInDate, checkOutDate);
    if (!available) return res.status(400).json({ message: "Room is not available" });

    const newBooking = new Booking({ customerId: req.user.id, roomId, checkInDate, checkOutDate });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role !== "customer" && booking.customerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (new Date(booking.checkInDate) <= new Date()) {
      return res.status(400).json({ message: "Cannot cancel past or ongoing bookings" });
    }

    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
    const bookings = await Booking.find()

    const count = await Booking.countDocuments();
    res.json({
      bookings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingsByDate = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) return res.status(400).json({ message: "Both startDate and endDate are required" });

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "startDate must be before endDate" });
    }

    const bookings = await Booking.find({
      checkInDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate("customerId", "username");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
