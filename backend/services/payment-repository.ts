import { IPayment, Payment } from "../models/payment-model";

export class PaymentRepository {
  async create(paymentData: IPayment): Promise<IPayment> {
    const payment = new Payment(paymentData);
    return payment.save();
  }

  async findAll(): Promise<IPayment[]> {
    return Payment.find().exec();
  }

  async findById(id: string): Promise<IPayment | null> {
    return Payment.findById(id).exec();
  }

  async update(id: string, updateData: Partial<IPayment>): Promise<IPayment | null> {
    return Payment.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<IPayment | null> {
    return Payment.findByIdAndDelete(id).exec();
  }
}
