import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paymentspage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paymentspage.component.html',
  styleUrl: './paymentspage.component.scss'
})
export class PaymentspageComponent {
  paymentForm: FormGroup;
  payments: { payment: string; amount: number; code: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      paymentName: ['', [Validators.required, Validators.maxLength(50)]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  addPayment() {
    if (this.paymentForm.valid) {
      const paymentName = this.paymentForm.value.paymentName;
      const amount = this.paymentForm.value.amount;

      this.payments.push({
        payment: paymentName,
        amount: amount,
        code: '',
      });

      // Reset form after adding the payment
      this.paymentForm.reset();
    }
  }
}
