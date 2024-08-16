import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionsService, TransactionResponse } from '../../services/transactions-service/transactions.service';
import { InvestmentFundResponse } from '../../services/investment-fund-service/investment-fund.service';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let transactionsService: TransactionsService;

  const mockTransactions: TransactionResponse[] = [
    {
      id: 'txn1',
      investmentFundId: 'fund1',
      date: '2024-08-15',
      amountPayment: 500,
      type: 'Deposit',
      investmentFundDetails: {
        id: 'fund1',
        name: 'Fund 1',
      } as InvestmentFundResponse
    },
    {
      id: 'txn2',
      investmentFundId: 'fund2',
      date: '2024-08-16',
      amountPayment: 1000,
      type: 'Withdrawal',
      investmentFundDetails: {
        id: 'fund2',
        name: 'Fund 2',
      } as InvestmentFundResponse
    }
  ];

  const mockEmptyTransactions: TransactionResponse[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TransactionListComponent],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            getTransactions: () => of(mockTransactions)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    transactionsService = TestBed.inject(TransactionsService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch transactions on initialization', () => {
    spyOn(transactionsService, 'getTransactions').and.callThrough();

    component.ngOnInit();

    expect(transactionsService.getTransactions).toHaveBeenCalled();
    expect(component.transactions).toEqual(mockTransactions);
  });

  it('should display transactions in the template', () => {
    component.transactions = mockTransactions;
    fixture.detectChanges();

    const listItems = fixture.nativeElement.querySelectorAll('.list-group-item');
    expect(listItems.length).toBe(mockTransactions.length);

    expect(listItems[0].textContent).toContain('ID: txn1');
    expect(listItems[0].textContent).toContain('Investment Fund: Fund 1');
    expect(listItems[0].textContent).toContain('Amount: $500 COP');
    expect(listItems[0].textContent).toContain('Date: 2024-08-15');
    expect(listItems[0].textContent).toContain('Type: Deposit');
  });

  it('should display no transactions message when there are no transactions', () => {
    component.transactions = mockEmptyTransactions;
    fixture.detectChanges(); // Trigger view update

    const noTransactionsMessage = fixture.nativeElement.querySelector('p');
    expect(noTransactionsMessage.textContent).toContain('No transactions available.');
  });
});
