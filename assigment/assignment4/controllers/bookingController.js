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
        
        const room = await Room.findOne({ roomNumber });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        
        const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
        const totalAmount = hours * room.pricePerHour;

        const newBooking = new Booking({ customerName, roomNumber, startTime, endTime, totalAmount });
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

        // Lấy thông tin booking cũ
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Kiểm tra nếu có thay đổi roomNumber
        let room = await Room.findOne({ roomNumber: roomNumber || booking.roomNumber });
        if (!room) {
            return res.status(400).json({ message: "Room number not found" });
        }

        // Cập nhật roomNumber nếu có thay đổi
        if (roomNumber) {
            booking.roomNumber = roomNumber;
        }

        // Cập nhật tên khách hàng (nếu có)
        if (customerName) {
            booking.customerName = customerName;
        }

        // Kiểm tra nếu có cập nhật thời gian
        if (startTime || endTime) {
            const newStartTime = startTime ? new Date(startTime) : booking.startTime;
            const newEndTime = endTime ? new Date(endTime) : booking.endTime;

            // Kiểm tra thời gian hợp lệ
            if (newEndTime <= newStartTime) {
                return res.status(400).json({ message: "End time must be after start time" });
            }

            // Cập nhật thời gian mới
            booking.startTime = newStartTime;
            booking.endTime = newEndTime;

            // Tính lại tổng tiền dựa trên số giờ thuê
            const hours = Math.ceil((newEndTime - newStartTime) / (1000 * 60 * 60)); // Số giờ
            booking.totalAmount = hours * room.pricePerHour;
        }

        // Lưu cập nhật vào database
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
