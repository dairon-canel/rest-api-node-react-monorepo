import { Express, Request, Response } from 'express';
import {
  createGatewayHandler,
  deleteGatewayHandler,
  getAllGatewayHandler,
  getGatewayHandler,
  updateGatewayHandler,
} from './controller/gateway.controller';
import {
  createPeripheralHandler,
  deletePeripheralHandler,
  getAllPeripheralByGatewayHandler,
  getPeripheralHandler,
  updatePeripheralHandler,
} from './controller/peripheral.controller';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import {
  createGatewaySchema,
  deleteGatewaySchema,
  getGatewaySchema,
  updateGatewaySchema,
} from './schema/gateway.schema';
import {
  createPeripheralSchema,
  deletePeripheralSchema,
  getPeripheralSchema,
  updatePeripheralSchema,
} from './schema/peripheral.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler,
  );
  app.get('/api/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  app.post(
    '/api/gateways',
    validateResource(createGatewaySchema),
    createGatewayHandler,
  );
  app.put(
    '/api/gateways/:serialNumber',
    validateResource(updateGatewaySchema),
    updateGatewayHandler,
  );
  app.get(
    '/api/gateways/:serialNumber',
    validateResource(getGatewaySchema),
    getGatewayHandler,
  );
  app.get('/api/gateways/all', getAllGatewayHandler);
  app.delete(
    '/api/gateways/:serialNumber',
    validateResource(deleteGatewaySchema),
    deleteGatewayHandler,
  );

  app.post(
    '/api/peripherals/:serialNumber',
    validateResource(createPeripheralSchema),
    createPeripheralHandler,
  );
  app.put(
    '/api/peripherals/:uid',
    validateResource(updatePeripheralSchema),
    updatePeripheralHandler,
  );
  app.get(
    '/api/peripherals/:uid',
    validateResource(getPeripheralSchema),
    getPeripheralHandler,
  );
  app.get(
    '/api/peripherals/:serialNumber/all',
    validateResource(getPeripheralSchema),
    getAllPeripheralByGatewayHandler,
  );
  app.delete(
    '/api/peripherals/:uid',
    validateResource(deletePeripheralSchema),
    deletePeripheralHandler,
  );
}

export default routes;
