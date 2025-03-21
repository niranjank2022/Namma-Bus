import mongoose from "mongoose";
import { Response } from "express";
import { User } from "../models/users";
import { Bus } from "../models/buses";
import { Admin } from "../models/admins";
import { ISeat, Trip } from "../models/trips";
import { MESSAGES } from "../../lib/constants";
import { CustomRequest, CustomJwtPayload } from "../../lib/interfaces";


export async function getBuses(req: CustomRequest, res: Response) {
  try {
    const { userId } = (req.user as CustomJwtPayload);
    const admin = await Admin.findById(new mongoose.Types.ObjectId(userId));
    if (!admin) {
      res.status(404).json({
        message: "User not found"
      });
      return;
    }

    if (!admin.buses || !admin.buses.length) {
      res.status(200).json({
        buses: [],
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }
    res.json({ buses: admin.buses });

  } catch (error) {

    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function getTrips(req: CustomRequest, res: Response) {
  try {
    const busId = req.params.busId;
    const trips = await Trip.find({ busId: busId });

    if (!trips || !trips.length) {
      res.status(200).json({
        message: MESSAGES.RECORD_NOT_FOUND,
        trips: []
      });
      return;
    }

    res.json({ trips });
  } catch (error) {

    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function addTrip(req: CustomRequest, res: Response) {
  try {
    const busId = req.params.busId;
    var { departureDateTime, departureLocation, arrivalDateTime, arrivalLocation } = req.body;
    departureDateTime = new Date(departureDateTime);
    arrivalDateTime = new Date(arrivalDateTime);

    const tripExists = await Trip.findOne({ busId, departureLocation, departureDateTime, arrivalLocation, arrivalDateTime });
    if (tripExists) {
      res.status(400).json({
        message: MESSAGES.RECORD_EXISTS,
      });
      return;
    }

    const bus = await Bus.findById(new mongoose.Types.ObjectId(busId));
    const trip = await Trip.create({ busId, departureLocation, departureDateTime, arrivalLocation, arrivalDateTime });
    bus.trips.push(trip._id.toString());
    trip.busId = bus._id.toString();

    const seats: ISeat[] = [];
    const size = bus.seatsLayout.bottomCol * bus.seatsLayout.bottomRow + bus.seatsLayout.topLeftCol * bus.seatsLayout.topLeftRow + bus.seatsLayout.topRightCol * bus.seatsLayout.topRightRow;
    for (let i = 0; i < size; i++)
      seats.push({ tag: `${bus.tagSeries}${i + 1}` });

    trip.seats = seats;

    await trip.save();
    await bus.save();

    res.json({
      message: MESSAGES.ADD_TRIP_SUCCESS
    })

  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function addBus(req: CustomRequest, res: Response) {
  try {
    const { userId } = (req.user as CustomJwtPayload);
    const { busNo, busName } = req.body;
    var bus = await Bus.findOne({ busNo, busName });

    if (bus) {
      res.status(400).json({ message: MESSAGES.RECORD_EXISTS });
      return;
    }
    console.log(req.body);

    bus = await Bus.create(req.body);
    console.log("SHit happended", userId);
    const admin = await Admin.findOne({ _id: userId });
    admin.buses.push(bus);
    
    await admin.save();
    res.json(bus);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}

export async function resetTrip(req: CustomRequest, res: Response) {
  try {
    const tripId = req.params.tripId; console.log(tripId);

    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      res.status(404).json({
        message: MESSAGES.RECORD_NOT_FOUND,
      });
      return;
    }

    for (const seat of trip.seats) {
      if (!seat.assignee) continue;

      const user = await User.findOne({ email: seat.assignee.email });
      if (!user) {
        res.status(404).json(MESSAGES.USER_NOT_FOUND);
        return;
      }

      const cancellationStatus = await user.cancelTicket(seat.assignee.ticketId);
      if (!cancellationStatus.success) {
        res.status(400).json(MESSAGES.RESET_FAILURE);
        return;
      }

      seat.assignee = null;
    }

    await trip.save();
    res.json(trip);

  } catch (error) {
    res.status(500).json({
      message: MESSAGES.ERROR_MESSAGE,
      error,
    });
  }
}
