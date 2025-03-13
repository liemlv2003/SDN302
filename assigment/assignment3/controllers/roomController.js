const Room = require('../models/roomModel');

// Lấy danh sách tất cả phòng karaoke
exports.getAllRooms = async (req, res) => {
    const rooms = await Room.find();
    res.render('rooms', { rooms });
};

// Hiển thị form thêm phòng
exports.showAddRoomForm = (req, res) => {
    res.render('addRoom');
};

// Xử lý thêm phòng mới
exports.addRoom = async (req, res) => {
    const { roomNumber, capacity, status, pricePerHour, features } = req.body;
    await Room.create({ roomNumber, capacity, status, pricePerHour, features: features.split(',') });
    res.redirect('/rooms');
};
