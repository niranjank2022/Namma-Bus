import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { MESSAGES } from "../../lib/constants";
import { Ticket } from "./tickets";
import { TicketStatus } from "../../lib/enums";


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  tickets: string[];

  isValidPassword(passwd: string): Promise<boolean>;
  cancelTicket(
    ticketId: string
  ): Promise<{
    success: boolean;
    message: string;
    error?: any;
  }>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tickets: {
    type: [String],
    default: [],
  },
});

// Hashing the password before saving them into the database - Security
userSchema.pre("save", async function (next: NextFunction) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to verify the user password
userSchema.methods.isValidPassword = async function (passwd: string) {
  return await bcrypt.compare(passwd, this.password);
};

// Method to cancel the booked ticket
userSchema.methods.cancelTicket = async function (
  ticketId: string
) {
  try {
    var ticketIndex: number = this.tickets.findIndex((_ticketId: string) => _ticketId === ticketId);
    if (ticketIndex == -1) {
      return { success: false, message: MESSAGES.RECORD_NOT_FOUND };
    }

    const ticket = await Ticket.findOne({ _id: this.tickets[ticketIndex] });
    ticket.status = TicketStatus.Cancelled;
    this.tickets.splice(ticketIndex, 1);

    await this.save();
    await ticket.save();
    return { success: true, message: MESSAGES.DELETE_SUCCESS };

  } catch (error) {
    return { success: false, message: MESSAGES.ERROR_MESSAGE, error };
  }
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
