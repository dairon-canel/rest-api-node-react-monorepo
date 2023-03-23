import express from 'express';
import { handleValidationErrors } from '../helpers';

import {
  createGateway,
  deleteGatewayById,
  Gateway,
  getGatewayBySerialNumber,
  getGateways,
  PeripheralDevice,
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
    return res.status(400).send(handleValidationErrors(res, error));
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

export const deleteGateway = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params;
    const deletedGateway = await deleteGatewayById(id);

    return res.json(deletedGateway);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const editGateway = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { serialNumber } = req.params;
    const newGateway: Gateway = req.body;

    if (!newGateway) {
      return res.sendStatus(400);
    }

    const gateway = await getGatewayBySerialNumber(serialNumber);

    if (!gateway) {
      return res.sendStatus(400);
    }

    Object.assign(gateway, newGateway);
    await gateway.save();

    return res.status(200).json(gateway).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addPeripheral = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { serialNumber } = req.params;
    const newPeripheral: PeripheralDevice = req.body;

    if (!newPeripheral) {
      return res.sendStatus(400);
    }

    const gateway = await getGatewayBySerialNumber(serialNumber);

    gateway.peripheralDevices = [...gateway.peripheralDevices, newPeripheral];
    await gateway.save();

    return res.status(200).json(gateway).end();
  } catch (error) {
    return res.status(400).send(handleValidationErrors(res, error));
  }
};

export const deletePeripheral = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { serialNumber, uid } = req.params;

    const gateway = await getGatewayBySerialNumber(serialNumber);

    if (!gateway?.peripheralDevices.some(pd => pd?.uid === Number(uid))) {
      return res.sendStatus(400);
    }

    gateway.peripheralDevices = gateway.peripheralDevices.filter(
      pd => pd.uid !== Number(uid),
    );
    await gateway.save();

    return res.status(200).json(gateway).end();
  } catch (error) {
    return res.status(400).send(handleValidationErrors(res, error));
  }
};

export const editPeripheral = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { serialNumber, uid } = req.params;
    const newGateway: Gateway = req.body;

    if (!newGateway) {
      return res.sendStatus(400);
    }

    const gateway = await getGatewayBySerialNumber(serialNumber);

    if (!gateway?.peripheralDevices.some(pd => pd?.uid === Number(uid))) {
      return res.sendStatus(400);
    }

    Object.assign(gateway.peripheralDevices, newGateway.peripheralDevices);
    await gateway.save();

    return res.status(200).json(gateway).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
