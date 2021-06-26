// auth.service.ts
// Authentication Service

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AngularFireAnalytics } from '@angular/fire/analytics';

const AUTH_API = 'https://obscure-mesa-76333.herokuapp.com/api/auth/';
const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private analytics: AngularFireAnalytics) { }
  login(credentials): Observable<any> {
    console.log(credentials)
    this.analytics.logEvent('custom_event', {"login":"xd"})
    return this.http.post(AUTH_API + 'sign-in', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    
  }
  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'sign-up', {
      username: user.username,
      email: user.email,
      password: user.passwordl
    }, httpOptions);
  }
}
