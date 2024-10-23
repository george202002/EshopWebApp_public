import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './dtos/user';
import { Router } from '@angular/router';
import { HomeService } from './home/home.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private isLoggedIn = false;
  private sessionTimeout = 30 * 60 * 1000; // 30 minutes
  private sessionExpirationTimer: any;

  constructor(private router: Router, private homeService: HomeService) {
    const storedUser = localStorage.getItem('currentUser');
    const storedExpiration = localStorage.getItem('sessionExpiration');
    if (storedUser && storedExpiration) {
      const expiration = parseInt(storedExpiration, 10);
      if (new Date().getTime() < expiration) {
        this.currentUserSubject.next(JSON.parse(storedUser));
        this.isLoggedIn = true;
        this.setSessionExpirationTimer(expiration - new Date().getTime());
      } else {
        this.clearCurrentUser();
      }
    }
  }

  setCurrentUser(user: User): void {
    this.isLoggedIn = true;
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    const expirationTime = new Date().getTime() + this.sessionTimeout;
    localStorage.setItem('sessionExpiration', expirationTime.toString());
    this.setSessionExpirationTimer(this.sessionTimeout);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  clearCurrentUser(): void {
    this.isLoggedIn = false;
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionExpiration');
    localStorage.removeItem('isLoggedIn');
    clearTimeout(this.sessionExpirationTimer);
    this.homeService.clearCart(); // Clear the cart on logout
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    this.checkSessionExpiration();
    return this.isLoggedIn;
  }

  resetSessionTimer(): void {
    if (this.isLoggedIn) {
      const expirationTime = new Date().getTime() + this.sessionTimeout;
      localStorage.setItem('sessionExpiration', expirationTime.toString());
      this.setSessionExpirationTimer(this.sessionTimeout);
    }
  }

  private setSessionExpirationTimer(timeout: number): void {
    clearTimeout(this.sessionExpirationTimer);
    this.sessionExpirationTimer = setTimeout(() => this.clearCurrentUser(), timeout);
  }

  private checkSessionExpiration(): void {
    const expirationTime = localStorage.getItem('sessionExpiration');
    if (expirationTime && new Date().getTime() > parseInt(expirationTime, 10)) {
      this.clearCurrentUser();
    }
  }

  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
}
