import { Response } from "express";
import { User } from "../models/users";
import { Trip, ISeat } from "../models/trips";
import { MESSAGES } from "../../lib/constants";
import { CustomJwtPayload, CustomRequest } from "../../lib/interfaces";
import mongoose from "mongoose";
import { Bus } from "../models/buses";


export async function searchTrips(req: CustomRequest, res: Response) {
  try {

    const trips = await Trip.find(req.query);

    if (!trips || trips.length === 0) {
      res.status(404).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    var layouts = [];
    for (const trip of trips) {
      let bus = await Bus.findOne({ _id: trip.busId });
      layouts.push(bus.seatsLayout);
    }

    res.json({ trips, layouts });
  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function bookTicket(req: CustomRequest, res: Response) {
  try {

    const tripId = req.params.tripId;
    const { seatId, username, email } = req.body;
    const trip = await Trip.findOne({ _id: tripId });
    const user = await User.findOne({ email, username });


    if (!trip) {
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

    const seatIndex = trip.seats.findIndex((seat: ISeat) => seat._id.toString() === seatId);
    if (seatIndex === -1) {
      res.status(400).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });

      return;
    }

    if (trip.seats[seatIndex].assignee !== undefined) {
      res.status(400).json({
        message: MESSAGES.RECORD_EXISTS,
      });
      return;
    }

    trip.seats[seatIndex].assignee = { username, email };
    user.bookedTickets.push({ tripId, seatId: trip.seats[seatIndex]._id.toString() });

    await trip.save();
    await user.save();

    res.json({ trip, user, message: MESSAGES.BOOK_SUCCESS });

  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function getBookedTickets(req: CustomRequest, res: Response) {
  try {
    const { userId } = req.user as CustomJwtPayload;
    const user = await User.findById(new mongoose.Types.ObjectId(userId))
    if (!user) {
      res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    var responseData = [];
    for (const ticket of user.bookedTickets) {
      const trip = await Trip.findOne({ _id: ticket.tripId });
      responseData.push({ ticketDetails: ticket, tripDetails: trip });
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

export async function cancelTicket(req: CustomRequest, res: Response) {
  try {
    const { tripId, seatId } = req.params;
    const { userId } = (req.user as CustomJwtPayload);
    const user = await User.findOne({ _id: userId });
    const trip = await Trip.findOne({ _id: tripId });
    if (!trip) {
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

    const status = await user.cancelTicket(tripId, seatId);
    if (!status.success) {
      res.status(400).json(MESSAGES.RESET_FAILURE);
      return;
    }

    const seatIndex = trip.seats.findIndex(
      (seat) => seat.assignee && seat.assignee.email === user.email,
    );
    if (seatIndex === -1) {
      res.status(404).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    trip.seats[seatIndex] = null;
    await trip.save();

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}
