import express from 'express';

import {
  addGateway,
  addPeripheral,
  getAllGateways,
  getGateway,
} from '../controllers/gateways';

export default (router: express.Router) => {
  router.get('/gateways', getAllGateways);
  router.get('/gateway/:serialNumber', getGateway);
  router.post('/gateways/create', addGateway);
  router.patch('/gateway/:serialNumber/addPeripheral', addPeripheral);
  //router.post('/gateway/:serialNumber/deletePeripheral/:uid', addGateway);
};
