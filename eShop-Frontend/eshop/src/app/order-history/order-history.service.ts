import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDTO } from '../dtos/order';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private baseUrl = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) {}

  getOrderHistory(userId: number): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.baseUrl}/history/${userId}`);
  }
}
