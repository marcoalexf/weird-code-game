import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/api/payment';

  constructor(private http: HttpClient) {}

  createPayment(payment: Payment, code: string, grid: string[][]): Observable<Payment> {
    const payload = {
      ...payment,
      grid,
      code
    }
    return this.http.post<Payment>(`${this.apiUrl}`, payload);
  }

  getAll() {
    return this.http.get<Payment[]>(`${this.apiUrl}/all`);
  }
}
