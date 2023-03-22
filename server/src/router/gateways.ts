import express from 'express';

import {
  addGateway,
  addPeripheral,
  deleteGateway,
  deletePeripheral,
  editGateway,
  getAllGateways,
  getGateway,
} from '../controllers/gateways';

export default (router: express.Router) => {
  router.get('/gateways', getAllGateways);
  router.get('/gateway/:serialNumber', getGateway);
  router.post('/gateways/create', addGateway);
  router.patch('/gateway/:serialNumber', editGateway);
  router.delete('/gateway/delete/:id', deleteGateway);
  router.patch('/gateway/:serialNumber/addPeripheral', addPeripheral);
  router.patch(
    '/gateway/:serialNumber/deletePeripheral/:uid',
    deletePeripheral,
  );
};
