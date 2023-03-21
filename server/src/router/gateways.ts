import express from 'express';

import {
  addGateway,
  getAllGateways,
  getGateway,
} from '../controllers/gateways';

export default (router: express.Router) => {
  router.get('/gateways', getAllGateways);
  router.get('/gateway/:serialNumber', getGateway);
  router.post('/gateways/create', addGateway);
};
