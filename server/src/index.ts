import express from 'express';
import { Request, Response } from 'express';

const PORT = 5000;

const app = express();

app.get('/api/v1', (req: Request, res: Response) => {
  res.send({message:'Hello from server'});
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})