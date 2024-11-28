import { Request, Response } from "express";
import { User } from "../models/users";
import { Bus } from "../models/buses";
import { MESSAGES } from "../../lib/constants";


export async function getBuses(req: Request, res: Response) {
    try {
        const buses = await Bus.find({});
        if (!buses || !buses.length) {
            res.status(204).json({
                message: MESSAGES.RECORD_NOT_FOUND
            });
            return;
        }

        res.json(buses);
    }
    catch (error) {
        res.status(500).json({
            message: MESSAGES.ERROR_MESSAGE,
            error
        });
    }
}

export async function addBus(req: Request, res: Response) {
    try {
        const { busNo, busName } = req.body;
        var bus = await Bus.findOne({ busNo, busName });

        if (bus) {
            res.status(400).json({ message: MESSAGES.RECORD_EXISTS });
            return;
        }

        bus = await Bus.create(req.body);
        res.json(bus);
    }
    catch (error) {
        res.status(500).json({
            message: MESSAGES.ERROR_MESSAGE,
            error
        });
    }
}

export async function resetBus(req: Request, res: Response) {
    try {
        const bus = await Bus.findById(req.params.busId);
        if (!bus) {
            res.status(404).json({
                message: MESSAGES.RECORD_NOT_FOUND
            });
            return;
        }

        for (const seat of bus.seats) {

            if (!seat.assignee)
                continue;

            const user = await User.findOne({ email: seat.assignee.email });
            if (!user) {
                res.status(404).json(MESSAGES.USER_NOT_FOUND);
                return;
            }

            const status = await user.cancelTicket(bus._id.toString(), seat._id.toString());
            if (!status.success) {
                res.status(400).json(MESSAGES.RESET_FAILURE);
                return;
            }

            seat.assignee = null;
        }

        await bus.save();
        res.json(bus);
    }
    catch (error) {
        res.status(500).json({
            message: MESSAGES.ERROR_MESSAGE,
            error
        });
    }
}
