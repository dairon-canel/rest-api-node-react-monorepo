import { Request, Response } from 'express';
import {
  CreatePeripheralInput,
  UpdatePeripheralInput,
  ReadPeripheralInput,
  DeletePeripheralInput,
} from '../schema/peripheral.schema';
import { findAndUpdateGateway, findGateway } from '../service/gateway.service';
import {
  createPeripheral,
  findPeripheral,
  findAndUpdatePeripheral,
  deletePeripheral,
  queryPeripheral,
} from '../service/peripheral.service';
import logger from '../utils/logger';

export async function createPeripheralHandler(
  req: Request<{}, {}, CreatePeripheralInput['body']>,
  res: Response,
) {
  try {
    const body = req.body;

    const { length } = await queryPeripheral({ gateway_id: body.gateway_id });

    if (length >= 10) {
      return res.status(400).send({
        error: 'No more than 10 peripheral devices are allowed for a gateway.',
      });
    }

    const gateway = await findGateway({ serialNumber: body.gateway_id });

    if (!gateway) return res.status(404).send({ error: 'Gateway not found' });

    const peripheral = await createPeripheral(body);

    await findAndUpdateGateway(
      { serialNumber: body.gateway_id },
      { peripheralCount: length + 1 },
      {
        new: true,
      },
    );

    return res.send(peripheral);
  } catch (error) {
    logger.error('Error creating peripheral:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error creating peripheral',
      message: (error as { message: string }).message,
    });
  }
}

export async function updatePeripheralHandler(
  req: Request<UpdatePeripheralInput['params']>,
  res: Response,
) {
  try {
    const uid = req.params.uid;

    const update = req.body;

    const peripheral = await findPeripheral({ uid });

    if (!peripheral) return res.sendStatus(403);

    const updatedPeripheral = await findAndUpdatePeripheral({ uid }, update, {
      new: true,
    });

    return res.send(updatedPeripheral);
  } catch (error) {
    logger.error('Error updating peripheral:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error updating peripheral',
      message: (error as { message: string }).message,
    });
  }
}

export async function getPeripheralHandler(
  req: Request<ReadPeripheralInput['params']>,
  res: Response,
) {
  try {
    const uid = req.params.uid;

    const peripheral = await findPeripheral({ uid });

    if (!peripheral) return res.sendStatus(404);

    res.send(peripheral);
  } catch (error) {
    logger.error('Error retrieving peripheral:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error retrieving peripheral',
      message: (error as { message: string }).message,
    });
  }
}

export async function getAllPeripheralHandler(
  req: Request<ReadPeripheralInput['params']>,
  res: Response,
) {
  try {
    const peripherals = await queryPeripheral({});

    if (!peripherals) return res.sendStatus(404);

    res.send(peripherals);
  } catch (error) {
    logger.error('Error retrieving peripherals:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error retrieving peripherals',
      message: (error as { message: string }).message,
    });
  }
}

export async function getAllPeripheralByGatewayHandler(
  req: Request<ReadPeripheralInput['params']>,
  res: Response,
) {
  try {
    const serialNumber = req.params.serialNumber;

    const peripherals = await queryPeripheral({ gateway_id: serialNumber });

    if (!peripherals) return res.sendStatus(404);

    res.send(peripherals);
  } catch (error) {
    logger.error('Error retrieving peripherals:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error retrieving peripherals',
      message: (error as { message: string }).message,
    });
  }
}

export async function deletePeripheralHandler(
  req: Request<DeletePeripheralInput['params']>,
  res: Response,
) {
  try {
    const uid = req.params.uid;

    const peripheral = await findPeripheral({ uid });

    if (!peripheral) return res.sendStatus(404);

    await deletePeripheral({ uid });

    res.send(peripheral);
  } catch (error) {
    logger.error('Error deleting peripheral:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error deleting peripheral',
      message: (error as { message: string }).message,
    });
  }
}
