const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ["available", "occupied", "maintenance"], required: true },
    pricePerHour: { type: Number, required: true },
    features: { type: [String], default: [] },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
