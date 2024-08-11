import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import isBiasValid from '../validators/biasValidator';
import { GridGenerator } from '../services/gridGenerator';
import { Grid } from '../models/grid';
const cors = require('cors');

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

// Endpoint to generate a grid with an optional bias
app.post('/api/grid', (req, res) => {
  const { bias } = req.body;
  const isValidBias = isBiasValid(bias);
  if (!isValidBias) {
    return res.status(400).json({ message: 'Wrong bias entered' });
  }

  const gridSize = 10;
  const gridGenerator = new GridGenerator();
  const grid: Grid = gridGenerator.generateGrid();

  // Apply bias if it's a single valid character
  if (isValidBias) {
    grid.applyBias(bias)
  }

  res.json({ grid: grid.printGrid() });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
