import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Player} from '../models/player';
import {catchError, retry} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpPlayerService {
  basePath = 'https://obscure-mesa-76333.herokuapp.com/api/players';
  basePath2 = 'https://obscure-mesa-76333.herokuapp.com/api/freeTournaments';
  basePlayer = 'players';
  constructor(private http: HttpClient, tokenStorageService: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  createPlayer(item): Observable<Player> {
    return this.http.post<Player>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getPlayer(id): Observable<Player> {
    return this.http.get<Player>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Player Data
  getPlayersList(): Observable<Player>{
    return this.http.get<Player>(`${this.basePath}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Player
  updatePlayer(id, item): Observable<Player>{
    return this.http.put<Player>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Player
  deletePlayer(id): Observable<any> {
    return this.http.delete<Player>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getListByTournamentId(id): Observable<Player>{
    return this.http.get<Player>(`${this.basePath2}/${id}/${this.basePlayer}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
}
