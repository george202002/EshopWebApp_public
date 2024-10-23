import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from './order-history.service';
import { OrderDTO } from '../dtos/order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: OrderDTO[] = [];
  isLoading: boolean = true;

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  private fetchOrderHistory(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = user?.id; // Get the user ID from the current user

    this.orderHistoryService.getOrderHistory(userId).subscribe((orders: OrderDTO[]) => {
      this.orderHistory = orders;
      this.isLoading = false;
    }, error => {
      console.error('Error fetching order history:', error);
      this.isLoading = false;
    });
  }
}
