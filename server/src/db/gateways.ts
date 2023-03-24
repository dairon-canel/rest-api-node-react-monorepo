import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Gateway extends Document {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices: Types.DocumentArray<PeripheralDevice>;
}

export interface PeripheralDevice extends Document {
  uid: number;
  vendor: string;
  dateCreated?: Date;
  status: 'online' | 'offline';
}

const PeripheralDeviceSchema = new Schema<PeripheralDevice>({
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
    default: 'offline',
  },
});

const GatewaySchema = new Schema<Gateway>({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
    index: true,
    validate: {
      validator: function (v: string) {
        return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.)){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          v,
        );
      },
      message: 'Invalid IPv4 address',
    },
  },
  peripheralDevices: {
    type: [PeripheralDeviceSchema],
    default: [],
    validate: {
      validator: function (v: Types.DocumentArray<PeripheralDevice>) {
        return v.length <= 10;
      },
      message: 'No more than 10 peripheral devices are allowed',
    },
  },
});

export const PeripheralDeviceModel = mongoose.model<PeripheralDevice>(
  'PeripheralDevice',
  PeripheralDeviceSchema,
);
export const GatewayModel = mongoose.model<Gateway>('Gateway', GatewaySchema);

export const getGateways = async () => await GatewayModel.find();

export const getGatewayBySerialNumber = async (serialNumber: string) =>
  await GatewayModel.findOne({ serialNumber });

export const createGateway = async (values: Gateway) =>
  await GatewayModel.create(values);

export const deleteGatewayById = async (id: string) =>
  await GatewayModel.findByIdAndDelete(id);

export const updateGatewayById = async (id: Types.ObjectId, values: Gateway) =>
  await GatewayModel.findByIdAndUpdate(id, values, { new: true });
