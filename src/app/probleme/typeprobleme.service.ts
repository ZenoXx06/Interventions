import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ITypeProbleme } from './typeprobleme';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeproblemeService {

  //private baseUrl = 'api/typesprobleme';
  private baseUrl = 'https://localhost:7115/v1/probleme';  
  constructor(private _http: HttpClient) { }


  obtenirTypesProbleme(): Observable<ITypeProbleme[]> {
    return this._http.get<ITypeProbleme[]>(this.baseUrl).pipe(
        tap(data => console.log('obtenirTypesProbleme: ' + JSON.stringify(data))),
        catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(err.message));
  }
}
