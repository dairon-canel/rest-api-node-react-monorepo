import { Gateway } from '../db/gateways';

const gateways: Gateway[] = [
  {
    serialNumber: 'GW001',
    name: 'Gateway 1',
    ipv4Address: '192.168.0.1',
    peripheralDevices: [
      {
        uid: 1,
        vendor: 'Vendor 1',
        status: 'online',
      },
      {
        uid: 2,
        vendor: 'Vendor 2',
        status: 'offline',
      },
    ],
  },
  {
    serialNumber: 'GW002',
    name: 'Gateway 2',
    ipv4Address: '192.168.1.1',
    peripheralDevices: [
      {
        uid: 1,
        vendor: 'Vendor 1',
        status: 'online',
      },
      {
        uid: 2,
        vendor: 'Vendor 2',
        status: 'offline',
      },
    ],
  },
  {
    serialNumber: 'GW003',
    name: 'Gateway 3',
    ipv4Address: '192.168.2.1',
    peripheralDevices: [
      {
        uid: 1,
        vendor: 'Vendor 1',
        status: 'online',
      },
      {
        uid: 2,
        vendor: 'Vendor 2',
        status: 'offline',
      },
    ],
  },
  {
    serialNumber: 'GW004',
    name: 'Gateway 4',
    ipv4Address: '192.168.3.1',
    peripheralDevices: [
      {
        uid: 1,
        vendor: 'Vendor 1',
        status: 'online',
      },
      {
        uid: 2,
        vendor: 'Vendor 2',
        status: 'offline',
      },
    ],
  },
];
