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
  const userId = res.locals.user._id;
  const body = req.body;

  const peripheral = await createPeripheral({ ...body, user: userId });

  return res.send(peripheral);
}

export async function updatePeripheralHandler(
  req: Request<UpdatePeripheralInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const uid = req.params.uid;

  const update = req.body;

  const peripheral = await findPeripheral({ uid });

  if (!peripheral) return res.sendStatus(403);

  if (String(peripheral.user) !== userId) {
    return res.sendStatus(403);
  }

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

  console.log(uid);
  const peripheral = await findPeripheral({ uid });

  if (!peripheral) return res.sendStatus(404);

  res.send(peripheral);
}

export async function getAllPeripheralByGatewayHandler(
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
  const userId = res.locals.user._id;

  const uid = req.params.uid;

  const peripheral = await findPeripheral({ uid });

  if (!peripheral) return res.sendStatus(404);

  if (String(peripheral.user) !== userId) {
    return res.sendStatus(403);
  }

  await deletePeripheral({ uid });
}
