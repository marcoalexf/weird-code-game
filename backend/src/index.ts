import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import isBiasValid from '../validators/biasValidator';
import { GridGenerator } from '../services/gridGenerator';
import { Grid } from '../models/grid';
import { PaymentRepository } from '../services/payment-repository';
import mongoose from 'mongoose';
import { IPayment } from '../models/payment-model';
const cors = require('cors');

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoUri, {});

const paymentRepository = new PaymentRepository();

app.use(cors());

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
  
  if (isValidBias) {
    grid.applyBias(bias)
  }

  res.json({ grid: grid.printGrid() });
});

app.get('/api/payment/all', async (req, res) => {
  try {
    const payments = await paymentRepository.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

app.post('/api/payment', async (req, res) => {
  try {
    const paymentData: IPayment = req.body as IPayment;
    if (!paymentData.payment || !paymentData.amount || !paymentData.code) {
      return res.status(400).json({ message: 'Invalid payment data' });
    }

    const newPayment = await paymentRepository.create(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save payment' });
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
