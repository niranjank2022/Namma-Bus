const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("./../models/users");
const Bus = require("./../models/buses");
const router = express.Router();

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