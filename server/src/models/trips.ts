import mongoose, { Schema, Model } from "mongoose";


interface IBookedUser {
    username: string;
    email: string;
    ticketId: string;
}

export interface ISeat {
    _id?: mongoose.Types.ObjectId;
    tag: string;
    assignee?: IBookedUser | null;
}

export interface ITrip {
    _id: mongoose.Types.ObjectId;
    busId: string;
    departureDateTime: Date;
    departureLocation: string;
    arrivalDateTime: Date;
    arrivalLocation: string;
    seats: ISeat[];
}

const bookedUserSchema = new Schema<IBookedUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    ticketId: {
        type: String,
        required: true,
    },
});

export const seatSchema = new Schema<ISeat>({
    tag: {
        type: String,
        required: true,
    },
    assignee: {
        type: bookedUserSchema,
        default: null,
    },
});

const tripSchema = new Schema<ITrip>({
    busId: {
        type: String,
        required: true,
    },
    departureDateTime: {
        type: Date,
        required: true,
    },
    departureLocation: {
        type: String,
        required: true,
    },
    arrivalDateTime: {
        type: Date,
        required: true,
    },
    arrivalLocation: {
        type: String,
        required: true,
    },
    seats: {
        type: [seatSchema],
        required: true,
    },
});

export const Trip: Model<ITrip> = mongoose.model<ITrip>("Trip", tripSchema);
