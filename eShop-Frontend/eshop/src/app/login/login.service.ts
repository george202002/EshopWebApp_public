import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dtos/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiUrl + "/login";

  constructor(private http: HttpClient) { }

  registerUser(newUser: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, newUser);
  }

  loginUser(username: string, password: string): Observable<any> {
    const params = new HttpParams()
    .set('username', username)
    .set('password', password);
    return this.http.post(`${this.baseUrl}/auth`, null, { params });
  }
}
