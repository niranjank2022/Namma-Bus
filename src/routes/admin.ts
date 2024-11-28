import express, { Request, Response } from "express";
import { User } from "../models/users";
import { Bus } from "../models/buses";

const router = express.Router();

router.get("/home", async (req: Request, res: Response) => {
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
});

router.post("/add-bus", async (req: Request, res: Response) => {
    try {
        const { busNo, busName } = req.body;
        var bus = await Bus.findOne({ busNo, busName });

        if (bus) {
            res.status(400).json({ message: "Record already found." });
            return;
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
            res.status(404).json({
                message: "Bus not found"
            });
            return;
        }

        for (const seat of bus.seats) {
            if (!seat.assignee)
                continue;

            const user = await User.findOne({ email: seat.assignee.email });
            if (!user) {
                res.status(404).json("User not found");
                return;
            }

            const status = await user.cancelTicket(bus._id.toString(), seat._id.toString());
            if (!status.success) {
                res.status(400).json("Reset failed");
                return;
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

export default router;
