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
    { field: 'balance', sortable: true, filter: true},
    { field: 'wins', sortable: true, filter: true},
    { field: 'losses', sortable: true, filter: true}
];
  columnDefsHist: ColDef[] = [
    { field: 'gameID', sortable: true, filter: true },
    { field: 'playerID', sortable: true, filter: true},
    { field: 'outcome', sortable: true, filter: true},
    { field: 'initialhand', sortable: true, filter: true },
    { field: 'recommendation', sortable: true, filter: true },
    { field: 'followedrec', sortable: true, filter: true},
    { field: 'dealerhand', sortable: true, filter: true},
    { field: 'bet', sortable: true, filter: true},
    { field: 'userbalance', sortable: true, filter: true},
  ]
rowData?: Observable<any[]>;
rowDataHist?: Observable<any[]>;

  constructor(private userService: UserService) { 
    this.rowData = this.userService.getAdminTable();

    this.rowDataHist = this.userService.getAdminHistory();
    console.log(this.rowDataHist);
    
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
        
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}





