import { Request, Response } from "express";
import { User } from "../models/users";
import { Bus, ISeat } from "../models/buses";
import { MESSAGES } from "../../lib/constants";

export async function getBuses(req: Request, res: Response) {
  try {
    const buses = await Bus.find({});
    if (!buses || !buses.length) {
      res.status(204).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    res.json(buses);
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function bookTicket(req: Request, res: Response) {
  try {
    const busId = req.params.busId;
    const { seatTag, username, email } = req.body;

    const bus = await Bus.findOne({ _id: busId });
    const user = await User.findOne({ email, username });
    if (!bus) {
      res.status(400).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }
    if (!user) {
      res.status(400).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    const seat = bus.seats.find((seat: ISeat) => seat.tag === seatTag);
    if (!seat) {
      res.status(400).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }
    if (seat.assignee) {
      res.status(400).json({
        message: MESSAGES.RECORD_EXISTS,
      });
      return;
    }

    seat.assignee = { username, email };
    user.bookedTickets.push({ busId, seatId: seat._id.toString() });

    await bus.save();
    await user.save();

    res.json({ bus, user, message: MESSAGES.BOOK_SUCCESS });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function getBookedBuses(req: Request, res: Response) {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username });
    if (!user) {
      res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    var responseData = [];
    for (const ticket of user.bookedTickets) {
      const bus = await Bus.findOne({ _id: ticket.busId });
      responseData.push({ ticketData: ticket, busData: bus });
    }

    if (!responseData.length) {
      res.status(204).json({ message: MESSAGES.RECORD_NOT_FOUND });
      return;
    }

    res.json({ tickets: responseData });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
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
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }
    if (!user) {
      res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    const userIndex = user.bookedTickets.findIndex(
      (ticket) => ticket.busId === busId && ticket.seatId === seatId,
    );
    if (userIndex === -1) {
      res.status(404).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    const busSeat = bus.seats.find(
      (seat) => seat.assignee && seat.assignee.email === email,
    );
    if (!busSeat) {
      res.status(404).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    user.bookedTickets.splice(userIndex, 1);
    busSeat.assignee = null;

    await bus.save();
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}
