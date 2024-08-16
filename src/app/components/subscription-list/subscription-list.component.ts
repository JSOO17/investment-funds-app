import { InvestorGlobalContextService } from '../../services/investor-global-context-service/investor-global-context.service';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService, SubscriptionResponse, CancelRequest } from '../../services/subscription-service/subscription.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: SubscriptionResponse[] = [];

  constructor(private subscriptionService: SubscriptionService, private InvestorGlobalContextService: InvestorGlobalContextService) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (data) => {
        this.subscriptions = data;
        console.log(data)
      },
      (error) => console.error('Error fetching subscriptions:', error)
    );
  }

  cancelSubscription(subscriptionId: string) {
    const request: CancelRequest = {
      id: subscriptionId,
      investorId: environment.investorId
    };

    this.subscriptionService.cancel(request).subscribe(
      () => {
        alert('Subscription canceled successfully');
        this.ngOnInit();
        this.refreshAmountInvestor();
      },
      (error) => alert('Cancellation failed: ' + error)
    )
  }

  refreshAmountInvestor(): void {
    this.InvestorGlobalContextService.refreshContext();
  }
}
