import { Component, OnInit } from '@angular/core';
import { SubscriptionService, SubscriptionResponse, CancelRequest } from '../../services/subscription.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: SubscriptionResponse[] = [];
  selectedInvestorId: string = '8d4ad04f-d9a5-414d-88c2-7f8d806ef119';

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (data) => this.subscriptions = data,
      (error) => console.error('Error fetching subscriptions:', error)
    );
  }

  cancelSubscription(subscriptionId: string) {
    const request: CancelRequest = {
      id: subscriptionId,
      investorId: this.selectedInvestorId
    };

    this.subscriptionService.cancel(request).subscribe(
      () => {
        alert('Subscription canceled successfully');
        this.ngOnInit();
      },
      (error) => alert('Cancellation failed: ' + error)
    );
  }
}
