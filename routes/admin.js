const express = require('express');
const router = express.Router();
const User = require("./../models/users");
const Bus = require("./../models/buses");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "ANYTHING_BUT_ORDINARY";

router.post("/login", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        var user = null;

        // Checking if user exists
        if (username) {
            user = await User.findOne({ username, isAdmin: true });
        }
        else {
            user = await User.findOne({ email, isAdmin: true });
        }

        if (!user) {
            return res.status(400).json({
                message: "Error: User do not exist"
            });
        }

        if (!(await user.isValidPassword(password))) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Create a JWT token and return with the response
		const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
		res.status(201).json({message: "Sign in successfull", token});
    }
    catch(error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const buses = await Bus.find({});
        if (!buses || !buses.length) {
            return res.status(204).json({
                message: "No bus records found."
            });
        }
        // console.log(buses);
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
        const bus = await Bus.create(req.body);
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
            res.status(404).json({
                message: "Bus not found"
            });
        }

        for (const seat of bus.seats) {
            if (!seat.assignee)
                continue;

            const user = await User.find( {email: seat.assignee.email} );
            if (user) {
                console.log(user);
                const status = user.cancelTicket(bus._id.toString(), seat._id.toString());
                console.log(status);
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