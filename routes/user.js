const express = require('express');
const router = express.Router();
const User = require("./../models/users");
const Bus = require("./../models/buses");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const JWT_SECRET_KEY = "MYKEYTOLOGGINGIN"
const { ObjectId } = mongoose.Types;

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Checking if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "Error: User email already exists"
            });
        }

        const user = await User.create(req.body);
        return res.status(200).json(user);
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        var user = null;

        // Checking if user exists
        if (username) {
            user = await User.findOne({ username });
        }
        else { 
            user = await User.findOne({ email });
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
		res.status(200).json({message: "Sign in successfull", token});
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        })
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

router.post("/book-ticket/:busId", async (req, res) => {
    
    try {
        const busId = req.params.busId;
        const { seatId, username, email } = req.body;

        const bus = await Bus.findOne({ _id: busId });
        const user = await User.findOne({ email, username });
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

        
        const seat = bus.seats.find( seat => seat.id === seatId );
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

        await bus.save();
        await user.save();

        res.json({bus, user, message: "Successfully ticket booked."});

    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
});

router.get("/booked", async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOne({ email, username });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        var responseData = [];
        for (const ticket of user.bookedTickets) {
            const bus = await Bus.findOne({_id: ticket.busId});
            responseData.push({ ticketData: ticket, busData: bus });
        }

        res.json({ tickets: responseData });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
})

router.patch("/booked/cancel/", async (req, res) => {
    try {
        const { busId, seatId, email, username } = req.body;
        const user = await User.findOne({ email, username });
        const bus = await Bus.findOne({ _id: busId });
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

        await bus.save();
        await user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
})

module.exports = router;