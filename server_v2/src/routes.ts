import { Express } from 'express';
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
  getAllPeripheralHandler,
  getPeripheralHandler,
  updatePeripheralHandler,
} from './controller/peripheral.controller';
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

function routes(app: Express) {
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
  app.get('/api/gateways', getAllGatewayHandler);
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
    '/api/peripherals',
    validateResource(getPeripheralSchema),
    getAllPeripheralHandler,
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
