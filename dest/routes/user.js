var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Bus = require("../models/buses");
const router = express.Router();
router.get("/home", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const buses = yield Bus.find({});
        if (!buses || !buses.length) {
            return res.status(204).json({
                message: "No bus records found."
            });
        }
        return res.json(buses);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}));
router.post("/book-ticket/:busId", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const busId = req.params.busId;
        const { seatId, username, email } = req.body;
        const bus = yield Bus.findOne({ _id: busId });
        const user = yield User.findOne({ email, username });
        if (!bus) {
            return res.status(400).json({
                message: "Bus not found"
            });
        }
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const seat = bus.seats.find(seat => seat.id === seatId);
        if (!seat) {
            return res.status(400).json({
                message: "Seat doesn't exist"
            });
        }
        if (seat.assignee) {
            return res.status(400).json({
                message: "Ticket already booked"
            });
        }
        seat.assignee = { username, email };
        user.bookedTickets.push({ busId, seatId: seat._id.toString() });
        yield bus.save();
        yield user.save();
        res.json({ bus, user, message: "Successfully ticket booked." });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}));
router.get("/booked", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, username } = req.body;
        const user = yield User.findOne({ email, username });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        var responseData = [];
        for (const ticket of user.bookedTickets) {
            const bus = yield Bus.findOne({ _id: ticket.busId });
            responseData.push({ ticketData: ticket, busData: bus });
        }
        if (!responseData.length) {
            return res.status(204).json({ message: "No records found" });
        }
        res.json({ tickets: responseData });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}));
router.patch("/booked/cancel/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { busId, seatId, email, username } = req.body;
        const user = yield User.findOne({ email, username });
        const bus = yield Bus.findOne({ _id: busId });
        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const userIndex = user.bookedTickets.findIndex(ticket => ticket.busId === busId && ticket.seatId === seatId);
        if (userIndex === -1) {
            return res.status(404).json({
                message: "ticket not booked"
            });
        }
        const busSeat = bus.seats.find(seat => seat.assignee && seat.assignee.email === email);
        if (!busSeat) {
            return res.status(404).json({
                message: "bus and seat doesn't exist"
            });
        }
        user.bookedTickets.splice(userIndex, 1);
        busSeat.assignee = null;
        yield bus.save();
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}));
module.exports = router;
