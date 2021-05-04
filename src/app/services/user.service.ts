// iser.service.ts
// User Data Service
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'https://obscure-mesa-76333.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(API_URL);
  }
}
