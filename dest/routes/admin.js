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
router.post("/add-bus", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { busNo, busName } = req.body;
        var bus = yield Bus.findOne({ busNo, busName });
        if (bus) {
            return res.status(400).json({ message: "Record already found." });
        }
        bus = yield Bus.create(req.body);
        res.json(bus);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}));
router.patch("/reset-bus", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { busNo, busName } = req.body;
        const bus = yield Bus.findOne({ busNo, busName });
        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }
        for (const seat of bus.seats) {
            if (!seat.assignee)
                continue;
            const user = yield User.findOne({ email: seat.assignee.email });
            if (!user) {
                return res.status(404).json("User not found");
            }
            const status = yield user.cancelTicket(bus._id.toString(), seat._id.toString());
            if (!status.success) {
                return res.status(400).json("Reset failed");
            }
            seat.assignee = null;
        }
        yield bus.save();
        res.json(bus);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}));
module.exports = router;
