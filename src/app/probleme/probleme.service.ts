import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ITypeProbleme } from './typeprobleme';
import { catchError, tap } from 'rxjs/operators';
import { IProbleme } from './probleme';

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
    private baseUrl = 'https://localhost:7115/v1/probleme'; 


constructor(private _http: HttpClient) { }

saveProbleme(probleme: IProbleme): Observable<IProbleme> {
    return this.createProbleme(probleme);
  }
  
 /** POST: add a new problem to the server */
private createProbleme(probleme: IProbleme): Observable<IProbleme> {
  return this._http.post<IProbleme>(this.baseUrl, probleme, this.httpOptions).pipe(
    tap((probleme: IProbleme) => console.log('added problem w/ id=${probleme.id}')),
    catchError(this.handleError)
  );
}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
  private handleError(err: HttpErrorResponse) {
    console.error(err.error);
    return throwError(() => new Error(err.message));
  }
}
