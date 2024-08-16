import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubscriptionService, SubscriptionResponse, SubscriptionRequest, CancelRequest } from './subscription.service';
import { environment } from '../../../enviroments/enviroments';
import { InvestmentFundResponse } from '../investment-fund-service/investment-fund.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let httpTestingController: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/api/subscription`;

  const mockSubscriptions: SubscriptionResponse[] = [
    {
      id: 'sub1',
      investmentFundDetails: {
        id: 'fund1',
        name: 'Fund 1',
      } as InvestmentFundResponse,
      amountPayment: 500
    }
  ];

  const mockError = 'Server error';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriptionService]
    });

    service = TestBed.inject(SubscriptionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve subscriptions from the API via GET', () => {
    service.getSubscriptions().subscribe(subscriptions => {
      expect(subscriptions.length).toBe(1);
      expect(subscriptions).toEqual(mockSubscriptions);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSubscriptions);
  });

  it('should handle error response from the API for getSubscriptions', () => {
    service.getSubscriptions().subscribe(
      () => fail('expected an error, not subscriptions'),
      error => expect(error).toEqual(mockError)
    );

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(mockError, { status: 500, statusText: 'Server Error' });
  });

  it('should make a POST request for subscribe', () => {
    const request: SubscriptionRequest = {
      investorId: 'investor1',
      investmentFundId: 'fund1',
      amountPayment: 500
    };

    service.subscribe(request).subscribe();

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(request);
    req.flush(null);
  });

  it('should handle error response from the API for subscribe', () => {
    const request: SubscriptionRequest = {
      investorId: 'investor1',
      investmentFundId: 'fund1',
      amountPayment: 500
    };

    service.subscribe(request).subscribe(
      () => fail('expected an error, not a successful response'),
      error => expect(error).toEqual(mockError)
    );

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(mockError, { status: 500, statusText: 'Server Error' });
  });

  it('should make a DELETE request for cancel', () => {
    const request: CancelRequest = {
      id: 'sub1',
      investorId: 'investor1'
    };

    service.cancel(request).subscribe();

    const req = httpTestingController.expectOne(`${apiUrl}/${request.id}`);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(request);
    req.flush(null);
  });

  it('should handle error response from the API for cancel', () => {
    const request: CancelRequest = {
      id: 'sub1',
      investorId: 'investor1'
    };

    service.cancel(request).subscribe(
      () => fail('expected an error, not a successful response'),
      error => expect(error).toEqual(mockError)
    );

    const req = httpTestingController.expectOne(`${apiUrl}/${request.id}`);
    req.flush(mockError, { status: 500, statusText: 'Server Error' });
  });
});
