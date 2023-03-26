import { Gateway } from '../types';

export const createGatewayService = async ({
  name,
  ipv4Address,
}: {
  name: string;
  ipv4Address: string;
}) => {
  return fetch('/api/gateways', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, ipv4Address }),
  });
};

export const getGatewaysService = async () => {
  return fetch('/api/gateways', {
    headers: { Accept: 'application/json' },
  })
    .then(res => res.json())
    .then(data => data as Gateway[]);
};

export const deleteGatewaysService = async (serialNumber: string) => {
  return fetch(`/api/gateways/${serialNumber}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const editGatewaysService = async ({
  serialNumber,
  gateway,
}: {
  serialNumber: string;
  gateway: Partial<Gateway>;
}) => {
  console.log(gateway);
  return fetch(`/api/gateways/${serialNumber}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gateway),
  });
};
