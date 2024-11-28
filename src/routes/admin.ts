import express from "express";
import { addBus, getBuses, resetBus } from "../controllers/adminController";


const router = express.Router();
router.get("/buses", getBuses);
router.post("/buses", addBus);
router.patch("/buses/reset-bus/:busId", resetBus);

export default router;
