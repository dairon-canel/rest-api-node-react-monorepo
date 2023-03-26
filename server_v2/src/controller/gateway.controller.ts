import { Request, Response } from 'express';
import {
  CreateGatewayInput,
  UpdateGatewayInput,
  ReadGatewayInput,
  DeleteGatewayInput,
} from '../schema/gateway.schema';
import {
  createGateway,
  findGateway,
  findAndUpdateGateway,
  deleteGateway,
  queryGateway,
} from '../service/gateway.service';
import {
  deletePeripheralsByGateway,
  queryPeripheral,
} from '../service/peripheral.service';
import logger from '../utils/logger';

export async function createGatewayHandler(
  req: Request<{}, {}, CreateGatewayInput['body']>,
  res: Response,
) {
  try {
    const body = req.body;

    const gateway = await createGateway(body);
    return res.send(gateway);
  } catch (error) {
    logger.error('Error creating gateway:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error creating gateway',
      message: (error as { message: string }).message,
    });
  }
}

export async function updateGatewayHandler(
  req: Request<UpdateGatewayInput['params']>,
  res: Response,
) {
  try {
    const serialNumber = req.params.serialNumber;
    const update = req.body;

    if (!update || !serialNumber) {
      return res.status(403).json({ error: 'Invalid gateway data' });
    }

    const gateway = await findGateway({ serialNumber });

    if (!gateway) return res.status(404).send({ error: 'Gateway not found' });

    const updatedGateway = await findAndUpdateGateway(
      { serialNumber },
      update,
      {
        new: true,
      },
    );

    return res.send(updatedGateway);
  } catch (error) {
    logger.error('Error updating gateway:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error updating gateway',
      message: (error as { message: string }).message,
    });
  }
}

export async function getGatewayHandler(
  req: Request<ReadGatewayInput['params']>,
  res: Response,
) {
  try {
    const serialNumber = req.params.serialNumber;

    const gateway = await findGateway({ serialNumber });

    if (!gateway) return res.status(404).send({ error: 'Gateway not found' });

    res.send(gateway);
  } catch (error) {
    logger.error('Error retrieving gateway:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error retrieving gateway',
      message: (error as { message: string }).message,
    });
  }
}

export async function getAllGatewayHandler(req: Request, res: Response) {
  try {
    const gateways = await queryGateway({}, {});

    if (!gateways) return res.status(404).send({ error: 'Gateway not found' });

    res.send(gateways);
  } catch (error) {
    logger.error('Error retrieving gateways:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error retrieving gateways',
      message: (error as { message: string }).message,
    });
  }
}

export async function deleteGatewayHandler(
  req: Request<DeleteGatewayInput['params']>,
  res: Response,
) {
  try {
    const serialNumber = req.params.serialNumber;

    const gateway = await findGateway({ serialNumber });

    if (!gateway) return res.status(404).send({ error: 'Gateway not found' });

    await deleteGateway({ serialNumber });

    if (gateway.peripheralCount && gateway.peripheralCount >= 1) {
      await deletePeripheralsByGateway({ gateway_id: serialNumber });
    }

    res.send(gateway);
  } catch (error) {
    logger.error('Error deleting gateway:');
    logger.error((error as { message: string }).message);
    res.status(500).json({
      error: 'Error deleting gateway',
      message: (error as { message: string }).message,
    });
  }
}
