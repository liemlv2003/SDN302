const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

// Lấy danh sách tất cả bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        console.log("📌 Fetching all bookings:", bookings); // Debug log để kiểm tra dữ liệu
        res.render('booking', { bookings }); // Đảm bảo `views/bookings.ejs` có tồn tại
    } catch (err) {
        console.error('❌ Error fetching bookings:', err);
        res.status(500).send('Error fetching bookings: ' + err.message);
    }
};


// Hiển thị form đặt phòng mới
exports.showBookingForm = async (req, res) => {
    res.render('bookRoom');
};

// Xử lý đặt phòng mới
exports.createBooking = async (req, res) => {
    const { customerName, roomNumber, startTime, endTime } = req.body;
    
    try {
        const room = await Room.findOne({ roomNumber });
        if (!room) {
            return res.status(400)
        }

        // Tính tổng tiền dựa trên giá phòng
        const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
        const totalAmount = Math.round(hours * room.pricePerHour);

        await Booking.create({ customerName, roomNumber, startTime, endTime, totalAmount });
        res.redirect('/bookings');
    } catch (err) {
        res.send('Error: ' + err.message);
    }
};

// Hiển thị form cập nhật booking
exports.showUpdateBookingForm = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    res.render('updateRoom', { booking });
};

// Cập nhật thông tin booking
exports.updateBooking = async (req, res) => {
    const { customerName, roomNumber, startTime, endTime } = req.body;

    try {
        const room = await Room.findOne({ roomNumber });
        if (!room) {
            return res.status(400)
        }

        const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
        const totalAmount = Math.round(hours * room.pricePerHour);

        await Booking.findByIdAndUpdate(req.params.id, { customerName, roomNumber, startTime, endTime, totalAmount });
        res.redirect('/bookings');
    } catch (err) {
        res.send('Error: ' + err.message);
    }
};

// Xóa booking
exports.deleteBooking = async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.redirect('/bookings');
};
