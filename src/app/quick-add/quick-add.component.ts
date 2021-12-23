import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';


var idcapture = sessionStorage.getItem('auth-user')?.split('"')[1];
var idconvert = Number(parseInt(idcapture!));


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
    bet: null,
  };
  player_id: any;
  

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    
  }

  public values: string[] = [];

  initialHandTypeChange(val: any){
    console.log(val);

    if (val == "H") {
      this.values = ["17+", "16", "15", "14", "13", "12", "11", "10", "9", "8-"];
    }
    else if (val == "S") {
      this.values = ["9", "8", "7", "6", "5", "4", "3", "2"];
    }
    else if (val == "P") {
      this.values = ["Ace", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
    }
    else {
      this.values = [];
    }
  }

  

  onSubmit(): void {

    const { handType, handValue, dealerCard, recommendation, outcome, bet } = this.form;
    const initialHand = handType + "_" + handValue;
    console.log(idconvert);
    
    this.userService.submitQuickGame(initialHand, dealerCard, recommendation, outcome, bet, idconvert).subscribe((data: any) => {
      console.log(data);
    });
    // window.location.reload();
  }

}


