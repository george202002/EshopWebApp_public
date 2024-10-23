import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { Item } from '../dtos/item';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemList: Item[] = [];
  paginatedItems: Item[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private homeService: HomeService, private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItemList().subscribe((data: Item[]) => {
      const cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      this.itemList = data.map(item => {
        const cartItem = cartItems.find((cart: Item) => cart.id === item.id);
        if (cartItem) {
          item.quantity -= cartItem.quantity;
        }
        return item;
      });
      this.paginateItems();
    });
  }

  addToCart(item: Item): void {
    if (item.quantity > 0) {
      item.quantity--;
      this.homeService.addToCart(item);
    }
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedItems = this.itemList.slice(startIndex, endIndex);
  }

  paginateItems(): void {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedItems = this.itemList.slice(startIndex, endIndex);
    } else {
      // Default pagination if paginator is not yet initialized
      this.paginatedItems = this.itemList.slice(0, 8);
    }
  }
}
