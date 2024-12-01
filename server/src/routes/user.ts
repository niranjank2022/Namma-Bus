import express from "express";
import {
  bookTicket,
  cancelTicket,
  getBookedBuses,
  getBuses,
} from "../controllers/userController";

const router = express.Router();
router.get("/buses", getBuses);
router.post("/buses/book-ticket/:busId", bookTicket);
router.get("/buses/booked", getBookedBuses);
router.patch("/buses/booked/cancel-ticket/", cancelTicket);

export default router;
