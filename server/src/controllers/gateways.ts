import express from 'express';
import { handleValidationErrors } from '../helpers';

import {
  createGateway,
  deleteGatewayById,
  Gateway,
  getGatewayBySerialNumber,
  getGateways,
  PeripheralDevice,
  PeripheralDeviceModel,
  updateGatewayById,
} from '../db/gateways';
import { Types } from 'mongoose';

export const getAllGateways = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const gateways = await getGateways();

    return res.status(200).json(gateways);
  } catch (error) {
    console.error('Error retrieving gateways:', error);
    return res.status(500).json({ error: 'Error retrieving gateways' });
  }
};

export const addGateway = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const newGateway: Gateway = req.body;

    if (!newGateway || !newGateway.serialNumber) {
      return res.status(400).json({ error: 'Invalid gateway data' });
    }

    const existingGateway = await getGatewayBySerialNumber(
      newGateway.serialNumber,
    );

    if (existingGateway) {
      return res.status(409).json({ error: 'Gateway already exists' });
    }

    const gateway = await createGateway(newGateway);

    return res.json(gateway);
  } catch (error) {
    console.error('Error adding gateway:', error);
    return res.status(500).json({ error: 'Error adding gateway' });
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
      return res.status(404).send({ error: 'Gateway not found' });
    }

    return res.status(200).json(gateway);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Error getting gateway' });
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
    console.error(error);
    return res.status(500).send({ error: 'Error deleting gateway' });
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
      return res.sendStatus(400).send({ error: 'Invalid request body' });
    }

    const gateway = await getGatewayBySerialNumber(serialNumber);

    if (!gateway) {
      return res.sendStatus(404).send({ error: 'Gateway not found' });
    }

    Object.assign(gateway, newGateway);
    await gateway.save();

    return res.status(200).json(gateway).end();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Error editing gateway' });
  }
};

export const addPeripheral = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { serialNumber } = req.params;
    const newPeripheral = new PeripheralDeviceModel(req.body);

    if (!newPeripheral) {
      return res.sendStatus(400).send({ error: 'Invalid request body' });
    }

    const gateway = await getGatewayBySerialNumber(serialNumber);

    if (!gateway) {
      return res.sendStatus(404).send({ error: 'Gateway not found' });
    }

    gateway.peripheralDevices.push(newPeripheral);
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
      return res.sendStatus(404).send({ error: 'Peripheral not found' });
    }

    gateway.peripheralDevices = gateway.peripheralDevices.filter(
      pd => pd.uid !== Number(uid),
    ) as Types.DocumentArray<PeripheralDevice>;

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
    const newPeripheral = new PeripheralDeviceModel(req.body);

    if (!newPeripheral) {
      return res.sendStatus(400).send({ error: 'Invalid request body' });
    }

    const gateway = await getGatewayBySerialNumber(serialNumber);

    if (!gateway?.peripheralDevices.some(pd => pd?.uid === Number(uid))) {
      return res.sendStatus(404).send({ error: 'Peripheral not found' });
    }

    const updatedPeripheralIndex = gateway.peripheralDevices.findIndex(
      pd => pd.uid === Number(uid),
    );

    if (!updatedPeripheralIndex) {
      return res
        .sendStatus(404)
        .send({ error: 'Peripheral with the uid in params not found' });
    }

    const updatedPeripheral = {
      ...gateway.peripheralDevices[updatedPeripheralIndex].toObject(),
      ...newPeripheral.toObject(),
    };

    gateway.peripheralDevices[updatedPeripheralIndex] = updatedPeripheral;

    await updateGatewayById(gateway._id as Types.ObjectId, gateway);

    return res.status(200).json(gateway).end();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Error editing gateway' });
  }
};
