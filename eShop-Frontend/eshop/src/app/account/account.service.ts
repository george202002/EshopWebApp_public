import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dtos/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl + "/account";

  constructor(private http: HttpClient) { }

  getAccountInfo(id: number): Observable<User>{
    const params = new HttpParams()
    .set('id', id);
    return this.http.post<User>(`${this.baseUrl}`, null, { params });
  }

  saveAccountInfo(username: string, name: string, surname: string, email: string, dob: string): Observable<boolean> {
    const params = new HttpParams()
    .set('username', username)
    .set('name', name)
    .set('surname', surname)
    .set('email', email)
    .set('dob', dob);
    return this.http.post<boolean>(`${this.baseUrl}/save`, null, { params });
  }
}
