import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../dtos/item';
import { AdminService } from '../admin.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  item: Item = new Item();
  selectedFile: File | null = null;
  itemEdited: boolean = false;
  itemError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.itemService.getItemById(itemId).subscribe(data => {
        this.item = data;
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateItem(): void {
    if (this.selectedFile) {
      this.adminService.updateItemWithImage(this.item, this.selectedFile).subscribe(
        response => {
          this.itemEdited = true;
        },
        error => {
          this.itemError = true;
        }
      );
    } else {
      this.adminService.updateItem(this.item).subscribe(
        response => {
          this.itemEdited = true;
        },
        error => {
          this.itemError = true;
        }
      );
    }
  }
}
