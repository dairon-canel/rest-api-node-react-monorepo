import express from 'express';

import authentication from './authentication';
import gateways from './gateways';
import users from './users';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  gateways(router);

  return router;
};
