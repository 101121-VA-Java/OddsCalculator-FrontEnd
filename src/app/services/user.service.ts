import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}) 
  
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  update(firstName: string, lastName: string, password: string, wins: number, losses: number): Observable<any> {
    return this.http.put(API_URL + '/users/id', {
      firstName,
      lastName,
      password,
      wins,
      losses}, httpOptions);
  }
}