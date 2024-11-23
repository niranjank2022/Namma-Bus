const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    seatId: {
        type: String,
        required: true
    },
    seatType: {
        type: String,
        required: true
    },
    seatPrice: {
        type: Number,
        required: true
    },
    isassigned: {
        type: Boolean,
        default: false
    },
    assignee: {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
});

const busSchema = new mongoose.Schema({
    busNo: {
        type: String,
        required: true
    },
    busName: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    departureLocation: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    arrivalLocation: {
        type: String,
        required: true
    },
    travelDuration: {
        type: Number,
        required: true
    },
    seat: [seatSchema]
});

module.exports = new mongoose.model("Bus", busSchema);