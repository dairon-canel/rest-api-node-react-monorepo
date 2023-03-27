import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect() {
  try {
    let nodeEnv = 'production';
    let dbUri = config.get<string>('dbUriProd');

    if (config.get<string>('node_env') === 'test') {
      dbUri = config.get<string>('dbUriDev');
      nodeEnv = 'test';
    }

    await mongoose.connect(dbUri);
    logger.info(`Server connected to ${nodeEnv} environment`);
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
