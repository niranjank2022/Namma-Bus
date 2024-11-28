import { Request, Response } from "express";
import { User } from "../models/users";
import { Bus } from "../models/buses";


export async function getBuses(req: Request, res: Response) {
    try {
        const buses = await Bus.find({});
        if (!buses || !buses.length) {
            res.status(204).json({
                message: "No bus records found."
            });
            return;
        }

        res.json(buses);
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}

export async function bookTicket(req: Request, res: Response) {

    try {
        const busId = req.params.busId;
        const { seatId, username, email } = req.body;

        const bus = await Bus.findOne({ _id: busId });
        const user = await User.findOne({ email, username });
        if (!bus) {
            res.status(400).json({
                message: "Bus not found"
            });
            return;
        }
        if (!user) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }

        const seat = bus.seats.find(seat => seat.tag === seatId);
        if (!seat) {
            res.status(400).json({
                message: "Seat doesn't exist"
            });
            return;
        }
        if (seat.assignee) {
            res.status(400).json({
                message: "Ticket already booked"
            });
            return;
        }

        seat.assignee = { username, email };
        user.bookedTickets.push({ busId, seatId: seat._id.toString() });

        await bus.save();
        await user.save();

        res.json({ bus, user, message: "Successfully ticket booked." });

    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}

export async function getBookedBuses(req: Request, res: Response) {
    try {
        const { email, username } = req.body;
        const user = await User.findOne({ email, username });
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        var responseData = [];
        for (const ticket of user.bookedTickets) {
            const bus = await Bus.findOne({ _id: ticket.busId });
            responseData.push({ ticketData: ticket, busData: bus });
        }

        if (!responseData.length) {
            res.status(204).json({ message: "No records found" });
            return;
        }

        res.json({ tickets: responseData });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error
        });
    }
}

export async function cancelTicket(req: Request, res: Response) {
    try {
        const { busId, seatId, email, username } = req.body;
        const user = await User.findOne({ email, username });
        const bus = await Bus.findOne({ _id: busId });
        if (!bus) {
            res.status(404).json({
                message: "Bus not found"
            });
            return;
        }
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        const userIndex = user.bookedTickets.findIndex(ticket => ticket.busId === busId && ticket.seatId === seatId);
        if (userIndex === -1) {
            res.status(404).json({
                message: "ticket not booked"
            });
            return;
        }

        const busSeat = bus.seats.find(seat => seat.assignee && seat.assignee.email === email);
        if (!busSeat) {
            res.status(404).json({
                message: "bus and seat doesn't exist"
            });
            return;
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
}
