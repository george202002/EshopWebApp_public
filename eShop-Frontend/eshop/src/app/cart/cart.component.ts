import { HomeService } from './../home/home.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../dtos/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Observable<Item[]> = new Observable<Item[]>();
  totalPrice: string = '0.00';

  constructor(private homeService: HomeService, private router: Router) {}


  ngOnInit(): void {
    this.cartItems = this.homeService.getCartItems();
    this.cartItems.subscribe(items => {
      this.totalPrice = this.calculateTotalPrice(items);
    });
  }

  removeFromCart(item: Item): void {
    this.homeService.removeFromCart(item);
    this.updateTotalPrice();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  private calculateTotalPrice(items: Item[]): string {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total.toFixed(2);
  }

  private updateTotalPrice(): void {
    this.cartItems.subscribe(items => {
      this.totalPrice = this.calculateTotalPrice(items);
    });
  }
}
