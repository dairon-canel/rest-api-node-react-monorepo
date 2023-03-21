import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { initializeDB, CONFIG } from './config';

import router from './router';

dotenv.config({
  path: path.join(__dirname, '.env'),
});

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

console.log(CONFIG);

app.get('/api/v1', (req: express.Request, res: express.Response) => {
  res.send({ message: 'Hello from server' });
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});

initializeDB();

app.use('/', router());

/* 
// Define interfaces for Gateway and PeripheralDevice models
interface Gateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices: PeripheralDevice[];
}

interface PeripheralDevice {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: 'online' | 'offline';
}

// Define a schema for the Gateway model
const gatewaySchema = new mongoose.Schema<Gateway>({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  ipv4Address: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        // Validate the IPv4 address
        return /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(v);
      },
      message: 'Invalid IPv4 address',
    },
  },
  peripheralDevices: {
    type: [
      {
        uid: {
          type: Number,
          required: true,
        },
        vendor: {
          type: String,
          required: true,
        },
        dateCreated: {
          type: Date,
          required: true,
          default: Date.now,
        },
        status: {
          type: String,
          required: true,
          enum: ['online', 'offline'],
          default: 'online',
        },
      },
    ],
    validate: {
      validator: function (v: PeripheralDevice[]) {
        // Check the number of peripheral devices associated with the gateway
        return v.length <= 10;
      },
      message: 'No more than 10 peripheral devices are allowed',
    },
  },
});

// Define a Gateway model
const GatewayModel = mongoose.model<Gateway>('Gateway', gatewaySchema);
 */
// Create a new express app
//const app = express();

/* // Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gateways');

// Middleware for parsing JSON data
app.use(express.json());

// Create a new gateway
app.post('/gateways', async (req, res) => {
  try {
    const gateway = new GatewayModel(req.body);
    const result = await gateway.save();
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all gateways
app.get('/gateways', async (req, res) => {
  try {
    const gateways = await GatewayModel.find();
    res.json(gateways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
