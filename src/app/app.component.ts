import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestorGlobalContextService, InvestorResponse } from './services/investor-global-context-service/investor-global-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule
  ]
})

export class AppComponent {
  investor: InvestorResponse = {} as InvestorResponse;

  updateAmountInvestor() {
    this.ngOnInit()
  }

  constructor(private investorGlobalContextService: InvestorGlobalContextService) {}

  ngOnInit(): void {
    this.investorGlobalContextService.refreshContext()

    this.investorGlobalContextService.context$.subscribe(
      (data) => {
        console.log(data)
        this.investor = data;
      },
      (error) => console.error('Error fetching subscriptions:', error)
    );
  }

  title = 'investment-funds';
}
