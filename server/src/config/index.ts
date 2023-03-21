import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

export const CONFIG = {
  API_VERSION: process.env.API_VERSION || 'v1',
  PORT: process.env.PORT || '5000',
  DB_HOST: process.env.MONGODB_URI || '',
  SWAGGER_OPTIONS: {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Extremely fast express-based API',
        version: '1.0.0',
        description:
          'This is an api service for handling frontend app requests',
        contact: {
          name: 'Dairon Canel',
          email: 'dcanelprofessional@gmail.com',
        },
      },
      servers: [
        {
          url: 'http://127.0.0.1:3000/v1',
        },
      ],
    },
    apis: ['src/api/**/*.ts', '../packages/db/src/models/**/*.ts'],
  },
};

export const initializeDB = async () => {
  try {
    await mongoose.connect(CONFIG.DB_HOST);
    // listen for requests
    console.log('The conection is Ok');
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
};
