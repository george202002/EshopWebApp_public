import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { Item } from '../dtos/item';
import { CheckoutService } from './checkout.service';
import { NewOrderDto } from '../dtos/newOrder';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  paymentSuccess: boolean = false;
  isLoading: boolean = false;

  constructor(private homeService: HomeService, private checkoutService: CheckoutService) {}

  processPayment(): void {
    this.isLoading = true;

    // Simulate payment processing
    setTimeout(() => {
      this.isLoading = false;
      this.paymentSuccess = true;
      this.confirmOrder();
      this.clearCart();
    }, 3000); // Simulate a delay of 3 seconds
  }

  private confirmOrder(): void {
    const cartItems: Item[] = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = user?.id; // Get the user ID from the current user

    const orderDTO: NewOrderDto = {
      userId: userId,
      items: cartItems.map(item => ({
        itemId: item.id,
        quantity: item.quantity
      })),
      totalOrderCost: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      orderDate: new Date()
    };

    this.checkoutService.confirmOrder(orderDTO).subscribe(response => {
      console.log('Order confirmed:', response);
    }, error => {
      console.error('Order confirmation failed:', error);
    });
  }

  private clearCart(): void {
    const cartItems: Item[] = JSON.parse(sessionStorage.getItem('cartItems') || '[]');

    // Update item quantities in the database
    this.checkoutService.updateQuantities(cartItems).subscribe(() => {
      // Clear the cart in session storage
      sessionStorage.removeItem('cartItems');
      this.homeService.clearCart();
    });
  }
}
