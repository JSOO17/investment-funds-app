import { TestBed } from '@angular/core/testing';

import { InvestmentFundService } from './investment-fund.service';

describe('InvestmentFundService', () => {
  let service: InvestmentFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
