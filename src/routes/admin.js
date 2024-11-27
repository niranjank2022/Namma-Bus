const express = require("express");
const User = require("../models/users");
const Bus = require("../models/buses");
const router = express.Router();

router.get("/home", async (req, res) => {
    try {
        const buses = await Bus.find({});
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
});

router.post("/add-bus", async (req, res) => {
    try {
        const { busNo, busName } = req.body;
        var bus = await Bus.findOne({ busNo, busName });

        if (bus) {
            return res.status(400).json({ message: "Record already found." });
        }

        bus = await Bus.create(req.body);
        res.json(bus);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
});

router.patch("/reset-bus", async (req, res) => {
    try {
        const { busNo, busName } = req.body;
        const bus = await Bus.findOne({ busNo, busName });
        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        for (const seat of bus.seats) {
            if (!seat.assignee)
                continue;

            const user = await User.findOne({ email: seat.assignee.email });
            if (!user) {
                return res.status(404).json("User not found");
            }

            const status = await user.cancelTicket(bus._id.toString(), seat._id.toString());
            if (!status.success) {
                return res.status(400).json("Reset failed");
            }
            seat.assignee = null;
        }

        await bus.save();
        res.json(bus);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
});

module.exports = router;
