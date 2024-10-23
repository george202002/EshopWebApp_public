import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { User } from '../dtos/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.userService.currentUser$.subscribe((user: User | null) => {
        this.isAdmin = user ? user.admin : false;
      })
    );
  }

  checkUserRole(): void {
    const user = this.userService.getCurrentUser();
    if(user){
      this.isAdmin = user.admin;
    }
  }

  logout(): void {
    this.userService.clearCurrentUser();
    this.router.navigate(['/login']);
  }

}
