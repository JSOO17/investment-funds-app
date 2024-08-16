import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvestmentFundService, InvestmentFundResponse } from '../../services/investment-fund-service/investment-fund.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvestmentFundItemComponent } from '../investment-fund-item/investment-fund-item.component';

@Component({
  selector: 'app-investment-fund-list',
  templateUrl: './investment-fund-list.component.html',
  styleUrls: ['./investment-fund-list.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InvestmentFundItemComponent
  ]
})
export class InvestmentFundListComponent implements OnInit {
  investmentFunds: InvestmentFundResponse[] = [];
  amountPayment: number = 0;



  constructor(
    private investmentFundService: InvestmentFundService
  ) { }

  ngOnInit(): void {
    this.investmentFundService.getInvestmentFunds().subscribe(
      (data) => {
        this.investmentFunds = data;
      }
    );

    console.log(this.investmentFunds)
  }

  handleDataChangedFromItem() {
    this.ngOnInit()
  }
}
