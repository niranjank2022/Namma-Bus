import mongoose, { Schema, Model } from "mongoose";

export interface IBookedUser {
    username: string;
    email: string;
}

export interface ISeat {
    _id: mongoose.Types.ObjectId;
    tag: string;
    class: string;
    price: number;
    assignee?: IBookedUser;
}

export interface IBus {
    _id: mongoose.Types.ObjectId;
    busNo: string;
    busName: string;
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
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const seatSchema = new Schema<ISeat>({
    tag: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    assignee: {
        type: bookedUserSchema
    }
});

const busSchema = new Schema<IBus>({
    busNo: {
        type: String,
        required: true
    },
    busName: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    departureLocation: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    arrivalLocation: {
        type: String,
        required: true
    },
    travelDuration: {
        type: Number,
        required: true
    },
    seats: {
        type: [seatSchema],
        default: []
    }
});


export const Bus: Model<IBus> = mongoose.model<IBus>("Bus", busSchema);
