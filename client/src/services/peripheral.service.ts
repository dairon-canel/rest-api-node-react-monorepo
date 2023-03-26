import { Gateway, PeripheralDevice } from '../types';

export const createPeripheralService = async ({
  name,
  ipv4Address,
}: {
  name: string;
  ipv4Address: string;
}) => {
  const response = await fetch('/api/gateways', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, ipv4Address }),
  });

  if (!response.ok) {
    throw new Error('Error creating Gateway');
  }
  return response.json();
};

export const getPeripheralsByGatewayService = async (serialNumber: string) => {
  const response = await fetch(`/api/peripherals/${serialNumber}/all`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Error retrieving Peripherals');
  }
  return (await response.json()) as Promise<PeripheralDevice[]>;
};

export const updatePeripheralService = async () => {
  const response = await fetch('/api/gateways', {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Error retrieving Gateway');
  }
  return (await response.json()) as Promise<Gateway[]>;
};

export const deletePeripheralService = async () => {
  const response = await fetch('/api/gateways', {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Error retrieving Gateway');
  }
  return (await response.json()) as Promise<Gateway[]>;
};
