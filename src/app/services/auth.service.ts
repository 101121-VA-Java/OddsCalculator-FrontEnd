import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'http://ec2-18-222-34-240.us-east-2.compute.amazonaws.com:8080' //Check to see if url/port is format or just URL
const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}) 
  
};
const httpPut = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Access-Control-Allow-Origin':'*'}) 
  
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    let credentials = `email=${email}&password=${password}`;
    return this.http.post(AUTH_API + '/auth', credentials, { headers: {
      // leverages form params to not expose credentials to the url
        'Content-type': 'application/x-www-form-urlencoded'
      },
      // indicates that we'll be interacting with the whole response rather than just the response body, gives us access to the headers
      observe: 'response',});
    }

    //  httpPut, observe: 'response')};
    //{headers:new HttpHeaders().set('Content Type', 'application/json').set('Access-Control-Allow-Origin','*')}

  register(firstName: string, lastName: string, email: string, password: string ): Observable<any> {

    return this.http.post(AUTH_API + '/users', {
      firstName,
      lastName,
      email,
      password}, httpOptions);

  }
}
