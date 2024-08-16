import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { InvestmentFundResponse } from '../investment-fund-service/investment-fund.service';

export interface TransactionResponse {
  id: string,
  investmentFundId: string,
  date: string,
  amountPayment: number,
  type: string,
  investmentFundDetails: InvestmentFundResponse
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = `${environment.apiUrl}/api/transaction`;

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
