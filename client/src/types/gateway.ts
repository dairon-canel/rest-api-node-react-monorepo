import { object, string, TypeOf } from 'zod';

export interface Gateway {
  _id?: string;
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralCount: number;
}

export interface PeripheralDevice {
  uid: number;
  vendor: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: 'ONLINE' | 'OFFLINE';
}

export const createGatewaySchema = object({
  name: string()
    .nonempty({
      message: 'Name is required',
    })
    .min(3, 'Name should be at least 3 characters long'),
  ipv4Address: string({
    required_error: 'Ip is required',
  })
    .nonempty({
      message: 'Ip Address is required',
    })
    .ip({ version: 'v4', message: 'Invalid IPv4 address' }),
});

export type CreateGatewayInput = TypeOf<typeof createGatewaySchema>;

export const editGatewaySchema = object({
  name: string()
    .nonempty({
      message: 'Name is required',
    })
    .min(3, 'Name should be at least 3 characters long'),
  ipv4Address: string({
    required_error: 'Ip is required',
  })
    .ip({ version: 'v4', message: 'Invalid IPv4 address' })
    .optional(),
});

export type EditGatewayInput = TypeOf<typeof editGatewaySchema>;
