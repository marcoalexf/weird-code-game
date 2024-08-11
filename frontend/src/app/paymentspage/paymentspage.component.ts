import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../payment-service.service';
import { Payment } from '../../models/payment';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { CodeService } from '../code.service';
import { GridService } from '../grid.service';

@Component({
  selector: 'app-paymentspage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paymentspage.component.html',
  styleUrl: './paymentspage.component.scss'
})
export class PaymentspageComponent implements OnInit {
  paymentForm: FormGroup;
  payments$: BehaviorSubject<Payment[]> = new BehaviorSubject(new Array<Payment>());
  paymentLoadingTrigger$: Subject<number> = new Subject();

  constructor(private fb: FormBuilder, private paymentService: PaymentService, private codeService: CodeService) {
    this.paymentForm = this.fb.group({
      paymentName: ['', [Validators.required, Validators.maxLength(50)]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.paymentLoadingTrigger$.subscribe({
      next: () => {
        this.paymentService.getAll().pipe(
          switchMap(value => {
            this.payments$.next(value);
            return value;
          })
        ).subscribe();
      }
    });

    this.paymentLoadingTrigger$.next(1);
  }

  addPayment() {
    if (this.paymentForm.valid) {
      this.paymentService.createPayment(this.paymentForm.value, this.codeService.code$.value, this.codeService.grid$.value).subscribe({
        next: (response) => {
          console.log('Payment created successfully:', response);
          this.paymentLoadingTrigger$.next(1);
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
