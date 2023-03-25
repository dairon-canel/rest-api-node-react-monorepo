import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { GatewayDocument } from './gateway.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 4);

export interface PeripheralDocument extends mongoose.Document {
  gateway: GatewayDocument['_id'];
  uid: number;
  vendor: string;
  dateCreated?: Date;
  status: 'online' | 'offline';
}

const peripheralSchema = new mongoose.Schema(
  {
    gateway: { type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' },
    uid: {
      type: Number,
      required: true,
      unique: true,
      default: () => `PD_${nanoid()}`,
    },
    vendor: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      enum: ['online', 'offline'],
      default: 'offline',
    },
  },
  {
    timestamps: true,
  },
);

const PeripheralModel = mongoose.model<PeripheralDocument>(
  'Peripheral',
  peripheralSchema,
);

export default PeripheralModel;
