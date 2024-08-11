import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  paymentName: string;
  amount: number;
  code: string;
  grid: string[][];
}

const PaymentSchema: Schema = new Schema({
  paymentName: { type: String, required: true },
  amount: { type: Number, required: true },
  code: { type: String, required: true },
  grid: { type: [[String]], required: true}
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
