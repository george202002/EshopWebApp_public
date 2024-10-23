import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from '../dtos/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginUsername: string = '';
  loginPassword: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  dob: Date = new Date();
  loginError: string = '';
  registrationError: string = '';
  loginSuccess: string = '';
  registrationSuccess: string = '';
  newUser: User = new User();

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  loginUser(): void {
    this.loginService.loginUser(this.loginUsername, this.loginPassword)
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.loginSuccess = 'Login successful';
          this.userService.setCurrentUser(response);
          if (response.admin) {
            this.router.navigate(['/admin']);
            return;
          }
          this.router.navigate(['/home']);
          return;
        },
        error => {
          console.error('Login failed', error);
          this.loginError = 'Invalid username or password';
        }
      );
  }

  registerUser(): void {
    this.newUser.dob = this.dob;
    this.newUser.email = this.email;
    this.newUser.name = this.name;
    this.newUser.surname = this.surname;
    this.newUser.password = this.password;
    this.newUser.username = this.username;

    this.loginService.registerUser(this.newUser)
      .subscribe(
        response => {
          console.log('Registration successful', response);
          this.registrationSuccess = 'Registration successful. Please login.';
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed', error);
          this.registrationError = 'Registration failed';
        }
      );
  }
}
