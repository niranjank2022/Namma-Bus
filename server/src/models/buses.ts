import mongoose, { Schema, Model } from "mongoose";

interface ISeatsLayout {
  topLeftRow: number,
  topLeftCol: number,
  topRightRow: number,
  topRightCol: number,
  bottomRow: number,
  bottomCol: number,
}

export interface IBus {
  _id: mongoose.Types.ObjectId;
  busNo: string;
  busName: string;
  price: number;
  tagSeries: string;
  seatsLayout: ISeatsLayout;
  trips: string[];
}

const seatsLayoutSchema = new Schema<ISeatsLayout>({
  topLeftRow: {
    type: Number,
    required: true,
  },
  topLeftCol: {
    type: Number,
    required: true,
  },
  topRightRow: {
    type: Number,
    required: true,
  },
  topRightCol: {
    type: Number,
    required: true,
  },
  bottomRow: {
    type: Number,
    required: true,
  },
  bottomCol: {
    type: Number,
    required: true,
  },
});

export const busSchema = new Schema<IBus>({
  busNo: {
    type: String,
    required: true,
  },
  busName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tagSeries: {
    type: String,
    required: true,
  },
  seatsLayout: {
    type: seatsLayoutSchema,
    required: true,
  },
  trips: {
    type: [String],
    default: [],
  }
});

export const Bus: Model<IBus> = mongoose.model<IBus>("Bus", busSchema);
