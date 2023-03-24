import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

export const CONFIG = {
  API_VERSION: process.env.API_VERSION || 'v1',
  PORT: process.env.PORT || '5000',
  DB_HOST: process.env.MONGODB_URI || '',
};

let mongoServer: MongoMemoryServer;

export const initializeDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();

      await mongoose.connect(mongoUri);
      console.log('Connected to mock database');
    } else {
      await mongoose.connect(CONFIG.DB_HOST);
      console.log('Connected to production database');
    }
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};
