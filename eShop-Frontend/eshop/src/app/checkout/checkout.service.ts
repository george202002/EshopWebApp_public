import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../dtos/item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewOrderDto } from '../dtos/newOrder';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = environment.apiUrl + "/order";
  private itemsUrl = environment.apiUrl + "/items";

  constructor(private http: HttpClient) {
  }

  updateQuantities(cartItems: Item[]): Observable<any> {
    return this.http.post(`${this.itemsUrl}/update-quantities`, cartItems);
  }

  confirmOrder(order: NewOrderDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm`, order);
  }
}
