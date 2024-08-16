import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroments';

export interface InvestorResponse {
  amount: number
}

@Injectable({
  providedIn: 'root'
})
export class InvestorGlobalContextService {

  private context = new BehaviorSubject<InvestorResponse>({} as InvestorResponse);
  context$ = this.context.asObservable();

  private apiUrl = `${environment.apiUrl}/api/investor/${environment.investorId}`

  constructor(private http: HttpClient) {}
  refreshContext(): void {
    this.http.get<InvestorResponse>(this.apiUrl)
      .pipe(
        tap(data => {
          console.log(data)
          this.context.next(data)
        }),
        catchError(error => {
          console.error('Error al consultar la API', error);
          return [];
        })
      )
      .subscribe();
  }

  updateContext(newContext: any): void {
    this.context.next(newContext);
  }

  getCurrentContext(): any {
    return this.context.getValue();
  }
}
