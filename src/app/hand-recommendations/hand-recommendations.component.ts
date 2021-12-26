import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

var idcapture = sessionStorage.getItem('auth-user')?.split('"')[1];
var idconvert = Number(parseInt(idcapture!));

@Component({
  selector: 'app-hand-recommendations',
  templateUrl: './hand-recommendations.component.html',
  styleUrls: ['./hand-recommendations.component.css']
})
export class HandRecommendationsComponent implements OnInit {
  dealerCardValue: string = '';
  dealerCardType: string = '';
  dealerCard: string = '';
  c1Value: string = '';
  c1Type: string = '';
  c1Card: string = '';
  c2Value: string = '';
  c2Type: string = '';
  c2Card: string = '';
  deckID: string = '';
  dealerCardImage: string = '';
  c1CardImage: string = '';
  c2CardImage: string = '';
  playerHand: string = '';
  recommendation: string = '';
  c1: number = 0;
  c2: number = 0;
  cardSum: number = 0;
  showAddGame: boolean = false;
  follow: string = '';
  outcome: number = 0;
  bet: number = 0;
  
  

  constructor( private userService: UserService) { }

  ngOnInit(): void {
  }

  dealerCardValueChangeHandler(event:any){
    this.dealerCardValue = event.target.value;
    console.log(this.dealerCardValue);
  }
  dealerCardTypeChangeHandler(event:any){
    this.dealerCardType = event.target.value;
    console.log(this.dealerCardType);
    this.getDealerCard();
  }

  c1ValueChangeHandler(event:any){
    this.c1Value = event.target.value;
  }
  c1TypeChangeHandler(event:any){
    this.c1Type = event.target.value;
    this.getC1Card();
  }

  c2ValueChangeHandler(event:any){
    this.c2Value = event.target.value;
  }
  c2TypeChangeHandler(event:any){
    this.c2Type = event.target.value;
    this.getC2Card();
  }
  getDealerCard(){
    this.dealerCard = this.dealerCardValue + this.dealerCardType;
    this.userService.getDealerCard(this.dealerCard).subscribe((data:any) => {
      this.deckID = data.deck_id;
      console.log(this.deckID);
      this.userService.getDealerCardImage(this.deckID).subscribe((response:any) => {
        console.log(response);
        this.dealerCardImage = response.cards[0].image;
      })
    });
  }
  getC1Card(){
    this.c1Card = this.c1Value + this.c1Type;
    this.userService.getC1Card(this.c1Card).subscribe((data:any) => {
      this.deckID = data.deck_id;
      console.log(this.deckID);
      this.userService.getC1CardImage(this.deckID).subscribe((response:any) => {
        console.log(response);
        this.c1CardImage = response.cards[0].image;
      })
    });
  }
  getC2Card(){
    this.c2Card = this.c2Value + this.c2Type;
    this.userService.getC1Card(this.c2Card).subscribe((data:any) => {
      this.deckID = data.deck_id;
      console.log(this.deckID);
      this.userService.getC1CardImage(this.deckID).subscribe((response:any) => {
        console.log(response);
        this.c2CardImage = response.cards[0].image;
      })
    });
  }

  showRecommendation(){
    if(this.dealerCardValue == "0" || this.dealerCardValue == "J" || this.dealerCardValue == "Q" || this.dealerCardValue == "K" ){
      this.dealerCardValue = "10";
    }
    if(this.c1Value == "0" || this.c1Value == "J" || this.c1Value == "Q" || this.c1Value == "K" ){
      this.c1Value = "10";
    }
    if(this.c2Value == "0" || this.c2Value == "J" || this.c2Value == "Q" || this.c2Value == "K" ){
      this.c2Value = "10";
    }

    if(this.c1Value == this.c2Value){
      this.playerHand = "P_" + this.c1Value;
    } else if (this.c1Value == "A"){
      this.playerHand = "S_A" + this.c2Value;
    } else if (this.c2Value == "A"){
      this.playerHand = "S_A" + this.c1Value;
    } else {
      this.c1 = +this.c1Value;
      this.c2 = +this.c2Value;
      this.cardSum = this.c1 + this.c2;
      this.playerHand = "H_" + this.cardSum.toString();
    }
    console.log(this.playerHand);
    console.log(this.dealerCardValue);
    this.userService.getRecommendation(this.playerHand, this.dealerCardValue).subscribe((data:any) => {
      this.recommendation = data;
      console.log(this.recommendation);
    })
    this.showAddGame = true;
  }

  followChangeHandler(event:any){
    this.follow = event.target.value;
  } 
  
  outcomeChangeHandler(event:any){
    this.outcome = event.target.value;
  }  

  betChangeHandler(event:any){
    this.bet = event.target.value;
  }

  submitGame(){
    console.log(this.follow);
    console.log(this.outcome);
    console.log(this.bet);

    console.log(idconvert);
    if(idconvert == null){
      idconvert = 0;
    }

    this.userService.submitGameToHistory(this.playerHand, this.dealerCardValue, this.follow, this.outcome, this.bet, idconvert);

    this.showAddGame = false;
    // window.location.reload();
  }

}
