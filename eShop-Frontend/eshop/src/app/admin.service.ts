import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './dtos/item';
import { Statistics } from './dtos/statistics';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  // Method to add a new item
  addItem(item: Item, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('price', item.price.toString());
    formData.append('quantity', item.quantity.toString());
    formData.append('image', file);

    return this.http.post(`${this.baseUrl}/addItem`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  // Method to update an existing item
  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/updateItem/${item.id}`, item);
  }

  updateItemWithImage(item: Item, file: File): Observable<Item> {
    const formData: FormData = new FormData();
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('price', item.price.toString());
    formData.append('quantity', item.quantity.toString());
    formData.append('image', file);

    return this.http.put<Item>(`${this.baseUrl}/updateItemWithImage/${item.id}`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  // Method to delete an item
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteItem/${id}`);
  }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.baseUrl}/statistics`);
  }
}
