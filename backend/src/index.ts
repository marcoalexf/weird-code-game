import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import isBiasValid from '../validators/biasValidator';
import { GridGenerator } from '../services/gridGenerator';
import { Grid } from '../models/grid';
import { PaymentRepository } from '../services/payment-repository';
import mongoose from 'mongoose';
import { IPayment } from '../models/payment-model';
import bodyParser from 'body-parser';
const cors = require('cors');

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const jsonParser = bodyParser.json()

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoUri, {});

const paymentRepository = new PaymentRepository();

app.use(cors());

app.get('/ping', (req, res) => {
  return res.json({message: 'pong'});
})

// Endpoint to generate a grid with an optional bias
app.post('/api/grid', jsonParser, (req, res) => {
  const { bias } = req.body;
  const isValidBias = isBiasValid(bias);
  if (!isValidBias) {
    return res.status(400).json({ message: 'Wrong bias entered' });
  }

  const gridGenerator = new GridGenerator();
  const grid: Grid = gridGenerator.generateGrid();
  grid.initializeGrid();

  if (isValidBias && bias.trim() !== '') {
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

app.post('/api/payment', jsonParser, async (req, res) => {
  try {
    const paymentData: IPayment = req.body as IPayment;
    console.log(paymentData);
    if (!paymentData.paymentName || !paymentData.amount || !paymentData.code || !paymentData.grid) {
      return res.status(400).json({ message: 'Invalid payment data' });
    }

    const newPayment = await paymentRepository.create(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Failed to save payment', error });
  }
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
