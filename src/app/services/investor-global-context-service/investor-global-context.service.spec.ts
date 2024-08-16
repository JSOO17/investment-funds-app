import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvestorGlobalContextService, InvestorResponse } from './investor-global-context.service';
import { environment } from '../../../enviroments/enviroments';

describe('InvestorGlobalContextService', () => {
  let service: InvestorGlobalContextService;
  let httpTestingController: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/api/investor/${environment.investorId}`;

  const mockInvestorResponse: InvestorResponse = {
    amount: 1000
  };

  const mockError = 'Server error';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvestorGlobalContextService]
    });

    service = TestBed.inject(InvestorGlobalContextService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should refresh context with data from API', () => {
    service.refreshContext();

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvestorResponse);

    service.context$.subscribe(context => {
      expect(context).toEqual(mockInvestorResponse);
    });
  });

  it('should handle error response in refreshContext', () => {
    service.refreshContext();

    const req = httpTestingController.expectOne(apiUrl);
    req.flush(mockError, { status: 500, statusText: 'Server Error' });

    service.context$.subscribe(context => {
      expect(context).toEqual({} as InvestorResponse);
    });
  });

  it('should update context', () => {
    const newContext: InvestorResponse = {
      amount: 2000
    };

    service.updateContext(newContext);

    expect(service.getCurrentContext()).toEqual(newContext);
  });

  it('should get the current context', () => {
    const currentContext: InvestorResponse = {
      amount: 3000
    };

    service.updateContext(currentContext);

    expect(service.getCurrentContext()).toEqual(currentContext);
  });
});
