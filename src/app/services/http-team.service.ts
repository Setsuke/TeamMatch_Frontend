import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Team} from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class HttpTeamService {
  basePath = 'https://obscure-mesa-76333.herokuapp.com/api/teams';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
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
  createTeam(item): Observable<Team> {
    return this.http.post<Team>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getTeam(id): Observable<Team> {
    return this.http.get<Team>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Team Data
  getTeamList(): Observable<Team>{
    return this.http.get<Team>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Team
  updateTeam(id, item): Observable<Team>{
    return this.http.put<Team>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Team
  deleteTeam(id): Observable<any> {
    return this.http.delete<Team>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Unirse a Team
  joinTeam(idPlayer, idTeam): Observable<any> {
    return this.http.post<Team>(`${this.basePath}/${idTeam}/players/${idPlayer}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
