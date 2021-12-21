import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit {

  form: any = {
    handType: null,
    handValue: null,
    dealerCard: null,
    recommendation: null,
    outcome: null,
    bet: null
  };

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    
  }

  public values: string[] = [];

  initialHandTypeChange(val: any){
    console.log(val);

    if (val == "hard") {
      this.values = ["17+", "16", "15", "14", "13", "12", "11", "10", "9", "8-"];
    }
    else if (val == "soft") {
      this.values = ["9", "8", "7", "6", "5", "4", "3", "2"];
    }
    else if (val == "pair") {
      this.values = ["Ace", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
    }
    else {
      this.values = [];
    }
  }

  

  onSubmit(): void {

    const { handType, handValue, dealerCard, recommendation, outcome, bet } = this.form;

    this.userService.submitQuickGame(handType, handValue, dealerCard, recommendation, outcome, bet);

  }

}


