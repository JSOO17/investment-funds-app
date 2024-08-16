import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroments';


export interface InvestmentFundResponse {
  id: string;
  name: string;
  minimumPayment: any,
  category: string,
  state: 'Subscribed' | 'Open'
}

@Injectable({
  providedIn: 'root'
})
export class InvestmentFundService {

  constructor(private http: HttpClient) { }

  getInvestmentFunds(): Observable<InvestmentFundResponse[]> {
    const result = this.http.get<InvestmentFundResponse[]>(environment.apiUrl + "/api/InvestmentFund").pipe(
      catchError(this.handleError)
    );

    return result;
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
