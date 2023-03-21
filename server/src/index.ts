import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { initializeDB, CONFIG } from './config';

import router from './router';

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//const server = http.createServer(app);

app.get('/api/v1', (req: express.Request, res: express.Response) => {
  res.send({ message: 'Hello from server' });
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});

initializeDB();

app.use('/', router());

/* 

// Get a gateway by serial number
app.get('/gateways/:serialNumber', async (req, res) => {
  try {
    const gateway = await GatewayModel.findOne({
      serialNumber: req.params.serialNumber,
    });
    if (gateway) {
      res.json(gateway);
    } else {
      res.status(404).json({ message: 'Gateway not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a peripheral device to a gateway
app.post('/gateways/:serialNumber/peripheral-devices', async (req, res) => {
  try {
    const gateway = await GatewayModel.findOne({
      serialNumber: req.params.serialNumber,
    });
    if (gateway) {
      gateway.peripheralDevices.push(req.body);
      const result = await gateway.save();
      res.json(result);
    } else {
      res.status(404).json({ message: 'Gateway not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a peripheral device from a gateway
app.delete(
  '/gateways/:serialNumber/peripheral-devices/:uid',
  async (req, res) => {
    try {
      const gateway = await GatewayModel.findOne({
        serialNumber: req.params.serialNumber,
      });
      if (gateway) {
        gateway.peripheralDevices = gateway.peripheralDevices.filter(
          device => device.uid !== parseInt(req.params.uid),
        );
        const result = await gateway.save();
        res.json(result);
      } else {
        res.status(404).json({ message: 'Gateway not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
); */
