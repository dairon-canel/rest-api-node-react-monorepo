import mongoose from 'mongoose';

export const CONFIG = {
  API_VERSION: 'v1',
  PORT: '5000',
  DB_HOST: 'mongodb+srv://dairon:ZN01Fc1oKuaGA3He@cluster0.lgjxbej.mongodb.net',
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
