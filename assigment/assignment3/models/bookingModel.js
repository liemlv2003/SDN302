const mongoose = require('mongoose');
const Room = require('./roomModel');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalAmount: { type: Number } // ❌ Không cần required, middleware sẽ tự động tính
});

// Middleware: Tự động tính totalAmount trước khi lưu
bookingSchema.pre('save', async function (next) {
    if (!this.isModified('startTime') && !this.isModified('endTime')) {
        return next();
    }

    try {
        const room = await Room.findOne({ roomNumber: this.roomNumber });
        if (!room) {
            return next(new Error('Room not found'));
        }

        const hours = (this.endTime - this.startTime) / (1000 * 60 * 60);
        this.totalAmount = Math.round(hours * room.pricePerHour);

        next();
    } catch (error) {
        next(error);
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
