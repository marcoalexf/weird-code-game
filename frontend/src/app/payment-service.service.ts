import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Payment {
  payment: string;
  amount: number;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/api/payment';

  constructor(private http: HttpClient) {}

  createPayment(payment: Payment): Observable<Payment> {
    const payload = {
      ...payment,
      grid: 100
    }
    return this.http.post<Payment>(`${this.apiUrl}`, payload);
  }

  getAll() {
    return this.http.get<Payment[]>(`${this.apiUrl}/all`);
  }
}
