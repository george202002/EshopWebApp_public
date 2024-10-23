import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Item } from '../dtos/item';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private cartItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartFromSessionStorage();
  }

  addToCart(item: Item): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingItem = currentCartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem: Item = { ...item, quantity: 1 };
      currentCartItems.push(newItem);
    }

    this.cartItemsSubject.next(currentCartItems);
    this.saveCartToSessionStorage();
  }

  removeFromCart(item: Item): void {
    const currentCartItems = this.cartItemsSubject.value.filter(cartItem => cartItem.id !== item.id);
    this.cartItemsSubject.next(currentCartItems);
    this.saveCartToSessionStorage();
  }

  getCartItems(): Observable<Item[]> {
    return this.cartItems$;
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToSessionStorage();
  }

  private saveCartToSessionStorage(): void {
    const cartItems = this.cartItemsSubject.value;
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  private loadCartFromSessionStorage(): void {
    const cartItems = sessionStorage.getItem('cartItems');
    if (cartItems) {
      this.cartItemsSubject.next(JSON.parse(cartItems));
    }
  }
}
