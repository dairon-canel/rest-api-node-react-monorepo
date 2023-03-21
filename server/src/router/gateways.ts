import express from 'express';

import { addGateway, getAllGateways } from '../controllers/gateways';

export default (router: express.Router) => {
  router.get('/gateways', getAllGateways);
  router.post('/gateways/create', addGateway);
};
