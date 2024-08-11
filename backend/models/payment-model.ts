import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  payment: string;
  amount: number;
  code: string;
}

const PaymentSchema: Schema = new Schema({
  payment: { type: String, required: true },
  amount: { type: Number, required: true },
  code: { type: String, required: true },
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
