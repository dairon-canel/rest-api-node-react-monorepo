import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 4);

export interface GatewayInput {
  name: string;
  ipv4Address: string;
}

export interface GatewayDocument extends GatewayInput, mongoose.Document {
  serialNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const gatewaySchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => `GW_${nanoid()}`,
    },
    name: {
      type: String,
      required: true,
      maxlength: 50,
      match: /^[a-zA-Z0-9\s]*$/,
    },
    ipv4Address: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.)){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            v,
          );
        },
        message: 'Invalid IPv4 address',
      },
    },
  },
  {
    timestamps: true,
  },
);

const GatewayModel = mongoose.model<GatewayDocument>('Gateway', gatewaySchema);

export default GatewayModel;
