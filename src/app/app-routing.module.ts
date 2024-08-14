import { RouterModule, Routes } from '@angular/router';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { NgModule } from '@angular/core';
import { InvestmentFundListComponent } from './components/investment-fund-list/investment-fund-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/subscriptions', pathMatch: 'full' },
  { path: 'subscriptions', component: SubscriptionListComponent },
  { path: 'investmentFunds', component: InvestmentFundListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
