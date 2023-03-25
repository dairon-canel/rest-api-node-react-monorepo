import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { GatewayDocument } from './gateway.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 4);

export interface PeripheralInput {
  gateway: GatewayDocument['_id'];
  vendor: string;
  status: string;
}

export interface PeripheralDocument extends PeripheralInput, mongoose.Document {
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}

const peripheralSchema = new mongoose.Schema(
  {
    gateway: { type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' },
    uid: {
      type: String,
      required: true,
      unique: true,
      default: () => `PD_${nanoid()}`,
    },
    vendor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['ONLINE', 'OFFLINE'],
      default: 'OFFLINE',
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
