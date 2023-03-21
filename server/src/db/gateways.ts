import mongoose from 'mongoose';

export interface Gateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices: PeripheralDevice[];
}

export interface PeripheralDevice {
  uid: number;
  vendor: string;
  dateCreated?: Date;
  status: 'online' | 'offline';
}

const GatewaySchema = new mongoose.Schema<Gateway>({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  ipv4Address: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(v);
      },
      message: 'Invalid IPv4 address',
    },
  },
  peripheralDevices: {
    type: [
      {
        uid: {
          type: Number,
          required: true,
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
          default: 'online',
        },
      },
    ],
    validate: {
      validator: function (v: PeripheralDevice[]) {
        // Check the number of peripheral devices associated with the gateway
        return v.length <= 10;
      },
      message: 'No more than 10 peripheral devices are allowed',
    },
  },
});

export const GatewayModel = mongoose.model<Gateway>('Gateway', GatewaySchema);

export const getGateways = () => GatewayModel.find();
export const getGatewayBySerialNumber = (serialNumber: string) =>
  GatewayModel.findOne({ serialNumber });
export const createGateway = (values: Gateway) =>
  new GatewayModel(values).save().then(gateway => gateway.toObject());
export const deleteGatewayById = (id: string) =>
  GatewayModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Gateway) =>
  GatewayModel.findByIdAndUpdate(id, values);
