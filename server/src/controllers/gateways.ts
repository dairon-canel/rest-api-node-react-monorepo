import express from 'express';

import {
  createGateway,
  Gateway,
  getGatewayBySerialNumber,
  getGateways,
} from '../db/gateways';

export const getAllGateways = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const gateways = await getGateways();

    return res.status(200).json(gateways);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addGateway = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const newGateway: Gateway = req.body;

    if (!newGateway) {
      return res.sendStatus(400);
    }

    const existingGateway = await getGatewayBySerialNumber(
      newGateway.serialNumber,
    );

    if (existingGateway) {
      return res.sendStatus(400);
    }

    const gateway = await createGateway(newGateway);

    return res.status(200).json(gateway).end();
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const errors: string[] = [];

      console.log(error.errors.ipv4Address.properties.message);
      Object.keys(error.errors).forEach(key => {
        if (error?.errors[key]?.properties?.message) {
          errors.push(error?.errors[key]?.properties?.message || '');
        }
      });
      console.log(errors);

      return res.status(400).send(errors);
    }
    res.status(500).send('Something went wrong');
  }
};

export const getGateway = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { serialNumber } = req.params;

    const gateway = await getGatewayBySerialNumber(serialNumber);

    if (!gateway) {
      return res.sendStatus(400);
    }

    return res.status(200).json(gateway);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
