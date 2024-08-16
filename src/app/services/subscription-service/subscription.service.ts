import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { InvestmentFundResponse } from '../investment-fund-service/investment-fund.service';

export interface SubscriptionResponse {
  id: string;
  investmentFundDetails: InvestmentFundResponse;
  amountPayment: number;
}

export interface SubscriptionRequest {
  investorId: string;
  investmentFundId: string;
  amountPayment: number;
}

export interface CancelRequest {
  id: string;
  investorId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.apiUrl}/api/subscription`;

  constructor(private http: HttpClient) { }

  getSubscriptions(): Observable<SubscriptionResponse[]> {
    return this.http.get<SubscriptionResponse[]>(this.apiUrl);
  }

  subscribe(request: SubscriptionRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  cancel(request: CancelRequest): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${request.id}`, {
      body: request
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
