import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
const cors = require('cors');

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/api/grid', (req, res) => {
  const grid = generateGrid();
  res.json({ grid });
});

function generateGrid() {
  const rows = 10;
  const cols = 10;
  const grid = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => getRandomChar())
  );
  return grid;
}

function getRandomChar() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
