import express from 'express';

import {
  addGateway,
  addPeripheral,
  deleteGateway,
  deletePeripheral,
  getAllGateways,
  getGateway,
} from '../controllers/gateways';

export default (router: express.Router) => {
  router.get('/gateways', getAllGateways);
  router.get('/gateway/:serialNumber', getGateway);
  router.post('/gateways/create', addGateway);
  router.delete('/gateway/:id', deleteGateway);
  router.patch('/gateway/:serialNumber/addPeripheral', addPeripheral);
  router.patch(
    '/gateway/:serialNumber/deletePeripheral/:uid',
    deletePeripheral,
  );
};
