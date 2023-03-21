import express from 'express';
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
