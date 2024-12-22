import express from "express";
import {
    searchTrips
} from "../controllers/userController";

const router = express.Router();
router.get("/search", searchTrips);

export default router;
