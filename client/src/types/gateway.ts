export interface Gateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices?: PeripheralDevice[];
}

export interface PeripheralDevice {
  uid: number;
  vendor: string;
  dateCreated?: Date;
  status: 'online' | 'offline';
}
