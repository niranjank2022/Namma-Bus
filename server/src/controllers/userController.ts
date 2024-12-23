import { Response } from "express";
import { User } from "../models/users";
import { Trip, ISeat } from "../models/trips";
import { MESSAGES } from "../../lib/constants";
import { CustomJwtPayload, CustomRequest } from "../../lib/interfaces";
import { Bus } from "../models/buses";
import { Ticket } from "../models/tickets";


export async function getProfileDetails(req: CustomRequest, res: Response) {

  try {
    const { userId } = req.user as CustomJwtPayload;
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.json({ username: user.username, email: user.email });
    }
    else {
      res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND
      });
    }
  }
  catch (error) {
    res.status(500).json({
      error,
      message: MESSAGES.USER_NOT_FOUND
    });
  }
}

export async function searchTrips(req: CustomRequest, res: Response) {

  try {
    const { departureLocation, arrivalLocation, journeyDate } = req.query;
    const startOfDay = new Date(`${journeyDate}T00:00:00.000Z`);
    const endOfDay = new Date(`${journeyDate}T23:59:59.999Z`);

    const trips = await Trip.find({ departureLocation, arrivalLocation, departureDateTime: { $gte: startOfDay, $lte: endOfDay } });
    if (!trips || trips.length === 0) {
      res.status(404).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    const data = [];
    for (const trip of trips) {

      const bus = await Bus.findOne({ _id: trip.busId });
      const duration = ((trip.arrivalDateTime.getTime() - trip.departureDateTime.getTime()) / 3600000).toFixed(2);
      var seatsAvailable = 0;

      for (const seat of trip.seats) {
        if (seat.assignee === null)
          seatsAvailable++;
      }

      data.push({
        trip,
        busName: bus.busName,
        layout: bus.seatsLayout,
        price: bus.price,
        tagSeries: bus.tagSeries,
        duration,
        seatsAvailable
      });
    }

    res.json({ data });

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
    const { seatId, userId } = req.body;
    const trip = await Trip.findOne({ _id: tripId });
    const user = await User.findOne({ _id: userId });

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

    if (trip.seats[seatIndex].assignee !== null) {
      res.status(400).json({
        message: MESSAGES.RECORD_EXISTS,
      });
      return;
    }

    const ticket = await Ticket.create({ tripId, seatId });
    trip.seats[seatIndex].assignee = { username: user.username, email: user.email, ticketId: ticket._id.toString() };
    user.tickets.push(ticket._id.toString());

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
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    var responseData = [];
    for (const ticketId of user.tickets) {
      const ticket = await Ticket.findOne({ _id: ticketId });
      const trip = await Trip.findOne({ _id: ticket.tripId });
      const seatTag = trip.seats.find((seat) => seat !== null && seat._id.toString() === ticket.seatId).tag;

      responseData.push({
        tripId: ticket.tripId,
        ticketId,
        ticketNo: ticket.ticketNo,
        createdAt: ticket.createdAt,
        departureLocation: trip.departureLocation,
        arrivalLocation: trip.arrivalLocation,
        departureDateTime: trip.departureLocation,
        arrivalDateTime: trip.arrivalLocation,
        seatTag
      });
    }

    if (!responseData.length) {
      res.status(204).json({ message: MESSAGES.RECORD_NOT_FOUND });
      return;
    }

    res.json({ trips: responseData });

  } catch (error) {

    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function cancelTicket(req: CustomRequest, res: Response) {
  try {
    const { tripId, ticketId } = req.params;
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

    const status = await user.cancelTicket(ticketId);
    if (!status.success) {
      res.status(400).json(MESSAGES.RESET_FAILURE);
      return;
    }

    const seatIndex = trip.seats.findIndex((seat: ISeat) => seat.assignee !== null && seat.assignee.ticketId === ticketId);
    if (seatIndex === -1) {
      res.status(404).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    trip.seats[seatIndex].assignee = null;
    await trip.save();

    res.json(user);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}
