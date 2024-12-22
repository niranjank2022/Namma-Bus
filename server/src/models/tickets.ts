import { NextFunction } from "express";
import mongoose, { Schema, Model } from "mongoose";
import { TicketStatus } from "./../../lib/enums";


export interface ITicket {
    tripId: string;
    seatId: string;
    ticketNo: string;
    status: TicketStatus;
    createdAt?: Date;
}

const ticketSchema = new Schema<ITicket>({
    tripId: {
        type: String,
        required: true,
    },
    seatId: {
        type: String,
        required: true,
    },
    ticketNo: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: Object.values(TicketStatus),
        default: TicketStatus.Pending,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ticketSchema.pre("save", async function (next: NextFunction) {
    this.ticketNo = `TIN-${this._id.toString().slice(-6)}`;
    next();
});

export const Ticket: Model<ITicket> = mongoose.model<ITicket>("Ticket", ticketSchema);
