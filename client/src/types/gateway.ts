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
