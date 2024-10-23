import { Component, HostListener } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Shop-Thesis';

  constructor(private userService: UserService) {}

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  resetSessionTimer(): void {
    this.userService.resetSessionTimer();
  }
}
