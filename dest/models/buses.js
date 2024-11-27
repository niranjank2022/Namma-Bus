const mongoose = require("mongoose");
const bookedUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
const seatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    assignee: {
        type: bookedUserSchema
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
    seats: {
        type: [seatSchema],
        default: []
    }
});
module.exports = new mongoose.model("Bus", busSchema);
