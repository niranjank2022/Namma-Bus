import mongoose, { Schema, Model } from "mongoose";

export interface IBookedUser {
    username: string;
    email: string;
}

export interface ISeat {
    _id?: mongoose.Types.ObjectId;
    tag: string;
    assignee?: IBookedUser;
}

export interface ITrip {
    _id: mongoose.Types.ObjectId;
    busId: string;
    departureTime: string;
    departureLocation: string;
    arrivalTime: string;
    arrivalLocation: string;
    travelDuration: number;
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
});

export const seatSchema = new Schema<ISeat>({
    tag: {
        type: String,
        required: true,
    },
    assignee: {
        type: bookedUserSchema,
    },
});

const tripSchema = new Schema<ITrip>({
    busId: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    departureLocation: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    arrivalLocation: {
        type: String,
        required: true,
    },
    travelDuration: {
        type: Number,
        required: true,
    },
    seats: {
        type: [seatSchema],
        required: true,
    },
});

export const Trip: Model<ITrip> = mongoose.model<ITrip>("Trip", tripSchema);
