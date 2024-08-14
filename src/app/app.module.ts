import { SubscriptionService } from './services/subscription.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { InvestmentFundService } from './services/investment-fund.service';
import { InvestmentFundListComponent } from './components/investment-fund-list/investment-fund-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionListComponent,
    InvestmentFundListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    SubscriptionService,
    InvestmentFundService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
