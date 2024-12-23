import express from "express";
import {
  bookTicket,
  cancelTicket,
  getBookedTickets,
  getProfileDetails,
  searchTrips
} from "../controllers/userController";

const router = express.Router();
router.get("/trips/search", searchTrips);
router.post("/trips/book-ticket/:tripId", bookTicket);
router.get("/trips/booked-tickets", getBookedTickets);
router.patch("/trips/booked-tickets/:tripId/cancel-ticket/:ticketId", cancelTicket);
router.get("/profile", getProfileDetails);

export default router;
