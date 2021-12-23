import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: any = {
    firstName: null,
    lastName: null,
    password: null
  };
  
  headers = ['userID', 'firstName', 'lastName', 'email', 'role', 'wins', 'losses'];
  rows: any[] = [];
  user: any;
  
  constructor(private userService: UserService) {
    
   }
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((res:any ) => {
      console.log(res)
      this.user = res
      console.log(this.rows);
      
    });
    
    console.log(this.rows);
    console.log("Hitting init");
  }
  // renderRows()
  onSubmit(): void {
    const { firstName, lastName, password} = this.form;
    console.log(this.form);
    
    this.userService.update(firstName, lastName, password).subscribe((data: any) => {
          console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        window.location.reload();
    });

    // error: (err: { error: { message: string; }; }) => {
      //   this.errorMessage = err.error.message;
      //   this.isSignUpFailed = true;
      // {
      // next: (data: any) => {
      //   console.log(data);
      //   this.isSuccessful = true;
      //   this.isSignUpFailed = false;
      //   window.location.reload();
      //   //This will update the user information by forcing ngOnInit to activate again..
      // },
      // error: (err: { error: { message: string; }; }) => {
      //   this.errorMessage = err.error.message;
      //   this.isSignUpFailed = true;
      // } Stretch goal of implementing error checking.
    // }
    // );
  }
}