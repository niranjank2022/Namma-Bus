import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { IBus, busSchema } from "./buses";


export interface IAdmin extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    buses: IBus[];
    isValidPassword(passwd: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>({
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
    buses: {
        type: [busSchema],
        default: [],
    },
});

// Hashing the password before saving them into the database - Security
adminSchema.pre("save", async function (next: NextFunction) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to verify the user password
adminSchema.methods.isValidPassword = async function (passwd: string): Promise<boolean> {
    return await bcrypt.compare(passwd, this.password);
};

export const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);
