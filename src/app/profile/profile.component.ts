import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';

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
  recwin: any;
  recloss: any;

  columnDefs: ColDef[] = [
    { field: 'gameID', sortable: true, filter: true },
    { field: 'userbalance', sortable: true, filter: true},
    { field: 'outcome', sortable: true, filter: true},
    { field: 'bet', sortable: true, filter: true},
    { field: 'initialHand'},
    { field: 'recommendation'},
    { field: 'followedRec'},
    { field: 'initialDealerHand'},
    
    
  ]
  winchart: any;
  rowData?: Observable<any[]>;
  userwinpercentage: any;
  
  constructor(private userService: UserService) {
    
   }
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((res:any ) => {
      console.log(res)
      this.user = res
      console.log(this.rows);
      const userwinpercentage = ((this.user.losses / this.user.wins) * 100)
      console.log(userwinpercentage);
      this.winchart = this.userService.viewWinChart(this.user.wins, this.user.losses);
      
    });
    this.rowData = this.userService.getUserHistory();
    console.log(this.rowData);
    console.log("Hitting init");
    this.userService.getUserRecWin().subscribe((res:any) => {
      console.log(res);
      this.recwin = res;
      
    });
    this.userService.getUserRecLosses().subscribe((res:any) => {
      console.log(res);
      this.recloss = res;
      
    });

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
      // }
    // }
    // );
  }
}