import express from "express";
import { addBus, addTrip, getBuses, getTrips, resetTrip } from "../controllers/adminController";

const router = express.Router();
router.get("/buses", getBuses);
router.post("/buses", addBus);
router.get("/buses/:busId/trips", getTrips);
router.post("/buses/:busId/trips", addTrip);
router.patch("/buses/reset-trip/:tripId", resetTrip);

export default router;
