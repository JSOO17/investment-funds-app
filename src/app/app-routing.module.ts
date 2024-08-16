import { Routes } from '@angular/router';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { InvestmentFundListComponent } from './components/investment-fund-list/investment-fund-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/investmentFunds', pathMatch: 'full' },
  { path: 'subscriptions', component: SubscriptionListComponent },
  { path: 'investmentFunds', component: InvestmentFundListComponent },
  { path: 'transactions', component: TransactionListComponent },
];
