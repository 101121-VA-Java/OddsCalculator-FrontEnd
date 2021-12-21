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
  getAdminTable(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'admin');
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

}