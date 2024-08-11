import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  paymentName: string;
  amount: number;
  code: string;
  grid: number;
}

const PaymentSchema: Schema = new Schema({
  paymentName: { type: String, required: true },
  amount: { type: Number, required: true },
  code: { type: String, required: true },
  grid: { type: Number, required: true}
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
