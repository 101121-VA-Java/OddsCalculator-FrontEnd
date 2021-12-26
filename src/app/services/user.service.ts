import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



const API_URL = 'http://localhost:8080/';
var idcapture = sessionStorage.getItem('auth-user')?.split('"')[1];
var idconvert = Number(parseInt(idcapture!));

const Params = {params: new HttpParams().set('id',!idconvert)}
const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}) 
  
};
const API_PATH = `http://localhost:8080/users/${idconvert}`;
const API_HIST = `http://localhost:8080/history/user/${idconvert}`;
const winnerchart = `https://quickchart.io/chart/render/zm-9eb07a63-73d7-4c0d-a21c-fe9b6e51ae35?data1=`
console.log(winnerchart + '35' + ',' + '20');
const API_REC =`http://localhost:8080/history/user/${idconvert}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  viewWinChart(wins: any, losses: any): any {
    return this.http.get(winnerchart  + wins + ',' +  losses);
  }
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'users', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }


  getAdminTable(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'admin');

  }
  getAdminHistory(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'history');

  }
  getUserProfile(): Observable<any[]> {
  console.log(idcapture);
  console.log(idconvert);
  return this.http.get<any[]>(API_PATH, Params)
  }
  update(firstName: string, lastName: string, password: string): Observable<any> {
    return this.http.put(API_URL + '/users/' + idconvert, {
      firstName,
      lastName,
      password}, httpOptions);
  }

  getUserHistory(): Observable<any[]> {
    return this.http.get<any[]>(API_HIST, Params)
  }

  submitQuickGame(initialHand:string, initialDealerHand:string, recommendation:string, outcome:number, bet: number, playerID: number): Observable<any> {
    console.log(initialHand);
    

    return this.http.post(API_URL + 'history', {
      initialHand,
      initialDealerHand,
      recommendation,
      outcome,
      bet,
      playerID}
      , httpOptions);
  }
  getUserRecWin(): Observable<any> {
    return this.http.get(API_REC + `/rec`, Params);
  }
  getUserRecLosses(): Observable<any> {
    return this.http.get(API_REC + `/notrec`, Params);
  }
}





  getDealerCard(dealerCard: string){
    return this.http.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=` + dealerCard);
  }
  getDealerCardImage(deckID: string){
    return this.http.get(`https://deckofcardsapi.com/api/deck/`+ deckID + `/draw/?count=1`);
  }

  getC1Card(c1Card: string){
    return this.http.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=` + c1Card);
  }
  getC1CardImage(deckID: string){
    return this.http.get(`https://deckofcardsapi.com/api/deck/`+ deckID + `/draw/?count=1`);
  }

  getC2Card(c2Card: string){
    return this.http.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=` + c2Card);
  }
  getC2CardImage(deckID: string){
    return this.http.get(`https://deckofcardsapi.com/api/deck/`+ deckID + `/draw/?count=1`);
  }

  getRecommendation(playerHand: string, dealerCardValue:string){
    return this.http.get(API_URL + 'rec/' + playerHand + "/" + dealerCardValue,  { responseType: 'text' } );
  }
  submitGameToHistory(initialHand:string, initialDealerHand:string, recommendation:string, outcome:number, bet: number, playerID: number): Observable<any> {
    console.log(initialHand);
    
    return this.http.post(API_URL + 'history', {
      initialHand,
      initialDealerHand,
      recommendation,
      outcome,
      bet,
      playerID}
      , httpOptions);
  }

}

