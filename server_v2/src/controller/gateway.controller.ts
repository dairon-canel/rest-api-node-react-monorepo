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

export async function createGatewayHandler(
  req: Request<{}, {}, CreateGatewayInput['body']>,
  res: Response,
) {
  const userId = res.locals.user._id;
  const body = req.body;

  const gateway = await createGateway({ ...body, user: userId });

  return res.send(gateway);
}

export async function updateGatewayHandler(
  req: Request<UpdateGatewayInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const serialNumber = req.params.serialNumber;
  const update = req.body;

  const gateway = await findGateway({ serialNumber });

  if (!gateway) return res.sendStatus(403);

  if (String(gateway.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedGateway = await findAndUpdateGateway({ serialNumber }, update, {
    new: true,
  });

  return res.send(updatedGateway);
}

export async function getGatewayHandler(
  req: Request<ReadGatewayInput['params']>,
  res: Response,
) {
  const serialNumber = req.params.serialNumber;

  const gateway = await findGateway({ serialNumber });

  if (!gateway) return res.sendStatus(404);

  res.send(gateway);
}

export async function getAllGatewayHandler(req: Request, res: Response) {
  const gateways = await queryGateway({}, {});

  if (!gateways) return res.sendStatus(404);

  res.send(gateways);
}

export async function deleteGatewayHandler(
  req: Request<DeleteGatewayInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id;

  const serialNumber = req.params.serialNumber;

  const gateway = await findGateway({ serialNumber });

  if (!gateway) return res.sendStatus(404);

  if (String(gateway.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteGateway({ serialNumber });

  res.send(gateway);
}
