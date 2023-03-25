import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { GatewayDocument } from './gateway.model';
import { UserDocument } from './user.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

export interface PeripheralInput {
  user: UserDocument['_id'];
  gateway_id: GatewayDocument['serialNumber'];
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gateway_id: { type: String, ref: 'Gateway' },
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
