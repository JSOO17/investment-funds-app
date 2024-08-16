import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvestmentFundResponse } from '../../services/investment-fund-service/investment-fund.service';
import { InvestorGlobalContextService } from '../../services/investor-global-context-service/investor-global-context.service';
import { SubscriptionRequest, SubscriptionService } from '../../services/subscription-service/subscription.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-investment-fund-item',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './investment-fund-item.component.html',
  styleUrl: './investment-fund-item.component.css'
})
export class InvestmentFundItemComponent {
  @Input() investmentFund: InvestmentFundResponse = {} as InvestmentFundResponse;
  @Output() dataChanged: EventEmitter<void> = new EventEmitter();
  amountPayment: number = 0;

  constructor(private subscriptionService: SubscriptionService,
    private InvestorGlobalContextService: InvestorGlobalContextService) {}

    subscribe(investmentFundId: string) {
      const request: SubscriptionRequest = {
        investorId: environment.investorId,
        investmentFundId: investmentFundId,
        amountPayment: this.amountPayment
      };

      this.subscriptionService.subscribe(request).subscribe(
        () => {
          alert('Subscription successful');
          this.refreshAmountInvestor()
          this.updateInvestmentFunds()
        },
        (error) => alert('Subscription failed: ' + error)
      );
    }

    refreshAmountInvestor(): void {
      this.InvestorGlobalContextService.refreshContext();
    }

    updateInvestmentFunds() {
      this.dataChanged.emit()
    }
}
