import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Organizer} from '../models/organizer';

@Injectable({
  providedIn: 'root'
})
export class HttpOrganizerService {
  basePath = 'https://team-match-backend.herokuapp.com/api/organizers';
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
  createOrganizer(item): Observable<Organizer> {
    return this.http.post<Organizer>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getOrganizer(id): Observable<Organizer> {
    return this.http.get<Organizer>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Organizer Data
  getOrganizerList(): Observable<Organizer>{
    return this.http.get<Organizer>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Organizer
  updateOrganizer(id, item): Observable<Organizer>{
    return this.http.put<Organizer>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Organizer
  deleteOrganizer(id): Observable<any> {
    return this.http.delete<Organizer>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
