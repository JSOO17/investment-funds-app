import { Component, Input, OnInit } from '@angular/core';
import { InvestmentFundService, InvestmentFundResponse } from '../../services/investment-fund.service';
import { SubscriptionRequest, SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-investment-fund-list',
  templateUrl: './investment-fund-list.component.html',
  styleUrls: ['./investment-fund-list.component.css']
})
export class InvestmentFundListComponent implements OnInit {
  investmentFunds: InvestmentFundResponse[] = [];
  selectedInvestorId: string = '8d4ad04f-d9a5-414d-88c2-7f8d806ef119';
  @Input() amountPayment: number = 0;

  constructor(
    private investmentFundService: InvestmentFundService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.investmentFundService.getInvestmentFunds().subscribe(
      (data) => this.investmentFunds = data,
      (error) => console.error('Error fetching investment funds:', error)
    );
  }

  subscribe(investmentFundId: string) {
    const request: SubscriptionRequest = {
      investorId: this.selectedInvestorId,
      investmentFundId: investmentFundId,
      amountPayment: this.amountPayment
    };

    this.subscriptionService.subscribe(request).subscribe(
      () => {
        alert('Subscription successful');
        // Opcional: actualizar la lista o realizar otras acciones tras la suscripción
      },
      (error) => alert('Subscription failed: ' + error)
    );
  }
}
