import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './dtos/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = environment.apiUrl + "/items";

  constructor(private http: HttpClient) { }

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}`);
  }

  // Method to get a single item by ID
  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }
}
