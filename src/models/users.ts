import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { MESSAGES } from "../../lib/constants";

export interface IBookedTicket {
  busId: string;
  seatId: string;
  createdAt?: Date;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  bookedTickets: IBookedTicket[];
  isValidPassword(passwd: string): Promise<boolean>;
  cancelTicket(
    busId: string,
    seatId: string,
  ): Promise<{
    success: boolean;
    message: string;
    error?: any;
  }>;
}

const bookedTicketSchema = new Schema<IBookedTicket>({
  busId: {
    type: String,
    required: true,
  },
  seatId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  bookedTickets: {
    type: [bookedTicketSchema],
    default: [],
  },
});

// Hashing the password before saving them into the database - Security
userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to verify the user password
userSchema.methods.isValidPassword = async function (passwd: string) {
  return await bcrypt.compare(passwd, this.password);
};

userSchema.methods.cancelTicket = async function (
  busId: string,
  seatId: string,
) {
  try {
    var ticketIndex: number = this.bookedTickets.findIndex(
      (ticket: IBookedTicket) =>
        ticket.busId === busId && ticket.seatId === seatId,
    );
    if (ticketIndex == -1) {
      return { success: false, message: MESSAGES.RECORD_NOT_FOUND };
    }

    this.bookedTickets.splice(ticketIndex, 1);
    await this.save();
    return { success: true, message: MESSAGES.DELETE_SUCCESS };
  } catch (error) {
    return { success: false, message: MESSAGES.ERROR_MESSAGE, error };
  }
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
