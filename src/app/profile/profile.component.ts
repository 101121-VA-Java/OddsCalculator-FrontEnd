import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userService: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: any = { 
    firstName: null,
    lastName: null,
    password: null,
    wins: null,
    losses: null 
  };
 

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  onSubmit(): void {
    const { firstName, lastName, password, wins, losses } = this.form;

    this.userService.update(firstName, lastName, password, wins, losses).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}