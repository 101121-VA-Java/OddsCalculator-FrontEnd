import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  
  columnDefs: ColDef[] = [
    { field: 'userID', sortable: true, filter: true },
    { field: 'firstName', sortable: true, filter: true},
    { field: 'lastName', sortable: true, filter: true},
    { field: 'email', sortable: true, filter: true },
    { field: 'role', sortable: true, filter: true },
    { field: 'wins', sortable: true, filter: true},
    { field: 'losses', sortable: true, filter: true}
];

rowData?: Observable<any[]>;

  constructor(private userService: UserService) { 
    this.rowData = this.userService.getAdminTable();
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
        console.log(data)
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}