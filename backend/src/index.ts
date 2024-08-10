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

function getRandomChar(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Endpoint to generate a grid with an optional bias
app.post('/api/grid', (req, res) => {
  const { bias } = req.body ?? '';

  // Validate bias
  const biasTrimmed = typeof bias === 'string' ? bias.trim().toLowerCase() : '';
  const isValidBias = biasTrimmed.length === 1 && /^[a-z]$/.test(biasTrimmed);

  if (biasTrimmed.length > 1 || (bias && !isValidBias)) {
    return res.status(400).json({ message: 'Wrong bias entered' });
  }

  const gridSize = 10;
  const grid: string[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill('')
  );

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      grid[row][col] = getRandomChar();
    }
  }

  // Apply bias if it's a single valid character
  if (isValidBias) {
    const biasCount = Math.floor(gridSize * gridSize * 0.2); // 20% of the grid

    for (let i = 0; i < biasCount; i++) {
      const randomRow = Math.floor(Math.random() * gridSize);
      const randomCol = Math.floor(Math.random() * gridSize);
      grid[randomRow][randomCol] = biasTrimmed;
    }
  }

  res.json({ grid });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
