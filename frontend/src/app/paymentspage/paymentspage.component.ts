import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../payment-service.service';

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

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.paymentForm = this.fb.group({
      paymentName: ['', [Validators.required, Validators.maxLength(50)]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  addPayment() {
    if (this.paymentForm.valid) {
      this.paymentService.createPayment(this.paymentForm.value).subscribe({
        next: (response) => {
          console.log('Payment created successfully:', response);
          // Handle successful payment creation
        },
        error: (err) => {
          console.error('Error creating payment:', err);
          // Handle error
        }
      });

      // Reset form after adding the payment
      this.paymentForm.reset();
    }
  }
}
