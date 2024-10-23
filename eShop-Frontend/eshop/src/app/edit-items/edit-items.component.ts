import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../dtos/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss']
})
export class EditItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItemList().subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  editItem(itemId: number): void {
    this.router.navigate(['/admin/edit-item', itemId]);
  }
}
