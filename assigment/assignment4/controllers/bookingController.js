const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const { customerName, roomNumber, startTime, endTime } = req.body;

        const start = new Date(startTime);
        const end = new Date(endTime);
        const now = new Date();

        if (start <= now) {
            return res.status(400).json({ message: "Start time must be in the future" });
        }
        if (end <= start) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        const room = await Room.findOne({ roomNumber });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const overlappingBooking = await Booking.findOne({
            roomNumber,
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } } 
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({ message: "Room is already booked for this time slot" });
        }

        const hours = Math.ceil((end - start) / (1000 * 60 * 60));
        const totalAmount = hours * room.pricePerHour;

        const newBooking = new Booking({ customerName, roomNumber, startTime: start, endTime: end, totalAmount });
        await newBooking.save();
        
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { startTime, endTime, customerName, roomNumber } = req.body;
        const start = new Date(startTime);
        const end = new Date(endTime);
        const now = new Date();

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        let room = await Room.findOne({ roomNumber: roomNumber || booking.roomNumber });
        if (!room) {
            return res.status(400).json({ message: "Room number not found" });
        }

        if (roomNumber) {
            booking.roomNumber = roomNumber;
        }

        if (customerName) {
            booking.customerName = customerName;
        }

        if (start || end) {
            const newStartTime = start ? new Date(start) : booking.startTime;
            const newEndTime = end ? new Date(end) : booking.endTime;
            
            if (start <= now) {
                return res.status(400).json({ message: "Start time must be in the future" });
            } 

            if (newEndTime <= newStartTime) {
                return res.status(400).json({ message: "End time must be after start time" });
            }

            const overlappingBooking = await Booking.findOne({
                roomNumber,
                $or: [
                    { startTime: { $lt: end }, endTime: { $gt: start } } 
                ]
            });
    
            if (overlappingBooking) {
                return res.status(400).json({ message: "Room is already booked for this time slot" });
            }

            booking.startTime = newStartTime;
            booking.endTime = newEndTime;

            const hours = Math.ceil((newEndTime - newStartTime) / (1000 * 60 * 60)); 
            booking.totalAmount = hours * room.pricePerHour;
        }

        await booking.save();

        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        await Booking.findByIdAndDelete(bookingId);
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
