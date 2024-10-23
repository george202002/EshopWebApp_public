import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { User } from '../dtos/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  constructor(private accountService: AccountService, public datepipe: DatePipe, private userService: UserService) { }

  currentUser: User | null = null;

  public formGroup = new FormGroup({

    name: new FormControl('', [
        Validators.required,
    ]),
    surname: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    dob: new FormControl('', [
      Validators.required,
    ]),
  });
  hide = true;

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    if (this.currentUser && this.currentUser.id !== undefined) {
      this.accountService.getAccountInfo(this.currentUser?.id).subscribe((data: User) => {
        console.log(data);
        this.formGroup.controls.name.setValue(data.name);
        this.formGroup.controls.surname.setValue(data.surname);
        this.formGroup.controls.email.setValue(data.email);
        this.formGroup.controls.dob.setValue(this.datepipe.transform(data.dob, 'dd/MM/yyyy'));
      });
    }
  }

  onSave(): void {
    if (this.formGroup.valid && this.currentUser !== null) {
      const name = this.formGroup.get('name')?.value;
      const surname = this.formGroup.get('surname')?.value;
      const email = this.formGroup.get('email')?.value;
      const dob = this.formGroup.get('dob')?.value;

      if(name !== undefined && surname !== undefined && email !== undefined && dob !== undefined && name !== null && surname !== null && email !== null && dob !== null) {
        user: User
        this.accountService.saveAccountInfo(this.currentUser.username, name, surname, email, dob)
          .subscribe((success: boolean) => {
            if (success) {
              console.log('User data saved successfully');
            } else {
              console.error('Failed to save user data');
            }
          });
      }
    }
  }
}
