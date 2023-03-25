import { Request, Response } from 'express';
import {
  CreatePeripheralInput,
  UpdatePeripheralInput,
  ReadPeripheralInput,
  DeletePeripheralInput,
} from '../schema/peripheral.schema';
import {
  createPeripheral,
  findPeripheral,
  findAndUpdatePeripheral,
  deletePeripheral,
} from '../service/peripheral.service';

export async function createPeripheralHandler(
  req: Request<{}, {}, CreatePeripheralInput['body']>,
  res: Response,
) {
  const body = req.body;

  const peripheral = await createPeripheral(body);

  return res.send(peripheral);
}

export async function updatePeripheralHandler(
  req: Request<UpdatePeripheralInput['params']>,
  res: Response,
) {
  const uid = req.params.uid;

  const update = req.body;

  const peripheral = await findPeripheral({ uid });

  if (!peripheral) return res.sendStatus(403);

  const updatedPeripheral = await findAndUpdatePeripheral({ uid }, update, {
    new: true,
  });

  return res.send(updatedPeripheral);
}

export async function getPeripheralHandler(
  req: Request<ReadPeripheralInput['params']>,
  res: Response,
) {
  const uid = req.params.uid;

  const peripheral = findPeripheral({ uid });

  if (!peripheral) return res.sendStatus(404);

  res.send(peripheral);
}

export async function getAllPeripheralHandler(
  req: Request<ReadPeripheralInput['params']>,
  res: Response,
) {
  const uid = req.params.uid;

  const peripheral = findPeripheral({ uid });

  if (!peripheral) return res.sendStatus(404);

  res.send(peripheral);
}

export async function deletePeripheralHandler(
  req: Request<DeletePeripheralInput['params']>,
  res: Response,
) {
  const uid = req.params.uid;

  const peripheral = findPeripheral({ uid });

  if (!peripheral) return res.sendStatus(404);

  await deletePeripheral({ uid });
}
