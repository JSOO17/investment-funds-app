import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface InvestmentFundResponse {
  id: string;
  name: string;
  minimumPayment: any,
  category: string
}

@Injectable({
  providedIn: 'root'
})
export class InvestmentFundService {
  private apiUrl = 'http://localhost:5000/api/investmentfund'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getInvestmentFunds(): Observable<InvestmentFundResponse[]> {
    return this.http.get<InvestmentFundResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.message || 'Server error');
  }
}
