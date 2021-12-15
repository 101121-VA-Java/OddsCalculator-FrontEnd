import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8080' //Check to see if url/port is format or just URL
const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/users/login', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string, firstname: string, lastname: string): Observable<any> {
    return this.http.post(AUTH_API + '/users', {
      email,
      password,
      firstname,
      lastname}, httpOptions);
  }
}
