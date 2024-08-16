import { Component } from '@angular/core';
import { TransactionResponse, TransactionsService } from '../../services/transactions-service/transactions.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  transactions: TransactionResponse[] = [];

  constructor(private subscriptionService: TransactionsService) { }

  ngOnInit(): void {
    this.subscriptionService.getTransactions().subscribe(
      (data) => {
        this.transactions = data;
        console.log(data)
      },
      (error) => console.error('Error fetching subscriptions:', error)
    );
  }
}
