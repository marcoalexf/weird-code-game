import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private apiUrl = 'http://localhost:8000/api/grid';

  constructor(private http: HttpClient) {}

  getGrid(bias: string): Observable<{ grid: string[][] }> {
    return this.http.post<{ grid: string[][] }>(this.apiUrl, { bias });
  }
}
