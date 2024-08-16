import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvestmentFundService, InvestmentFundResponse } from './investment-fund.service';
import { environment } from '../../../enviroments/enviroments';

describe('InvestmentFundService', () => {
  let service: InvestmentFundService;
  let httpTestingController: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/api/InvestmentFund`;

  const mockInvestmentFunds: InvestmentFundResponse[] = [
    {
      id: 'fund1',
      name: 'Investment Fund 1',
      minimumPayment: 1000,
      category: 'Equity',
      state: 'Open'
    },
    {
      id: 'fund2',
      name: 'Investment Fund 2',
      minimumPayment: 500,
      category: 'Bond',
      state: 'Subscribed'
    }
  ];

  const mockError = 'Server error';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvestmentFundService]
    });

    service = TestBed.inject(InvestmentFundService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve investment funds from the API via GET', () => {
    service.getInvestmentFunds().subscribe(funds => {
      expect(funds.length).toBe(2);
      expect(funds).toEqual(mockInvestmentFunds);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvestmentFunds);
  });

  it('should handle error response from the API for getInvestmentFunds', () => {
    service.getInvestmentFunds().subscribe(
      () => fail('expected an error, not investment funds'),
      error => expect(error).toBe(mockError)
    );

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(mockError, { status: 500, statusText: 'Server Error' });
  });
});
