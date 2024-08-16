import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionsService, TransactionResponse } from './transactions.service';
import { environment } from '../../../enviroments/enviroments';
import { InvestmentFundResponse } from '../investment-fund-service/investment-fund.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpTestingController: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/api/transaction`;

  const mockTransactions: TransactionResponse[] = [
    {
      id: '1',
      investmentFundId: 'fund1',
      date: '2024-08-15',
      amountPayment: 1000,
      type: 'deposit',
      investmentFundDetails: {
        id: 'fund1',
        name: 'Fund 1',
      } as InvestmentFundResponse
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionsService]
    });

    service = TestBed.inject(TransactionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve transactions from the API via GET', () => {
    service.getTransactions().subscribe(transactions => {
      expect(transactions.length).toBe(1);
      expect(transactions).toEqual(mockTransactions);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTransactions);
  });

  it('should handle error response from the API', () => {
    const errorMessage = 'Server error';

    service.getTransactions().subscribe(
      () => fail('expected an error, not transactions'),
      error => expect(error).toEqual(errorMessage)
    );

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
