import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { Item } from '../dtos/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  item: Item = new Item();
  selectedFile: File | null = null;
  itemAdded: boolean = false;
  itemError: boolean = false;

  constructor(private adminService: AdminService, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.adminService.addItem(this.item, this.selectedFile).subscribe(
        response => {
          this.itemAdded = true;
          this.router.navigate(['/admin']);
        },
        error => {
          this.itemError = true;
        }
      );
    }
  }
}
