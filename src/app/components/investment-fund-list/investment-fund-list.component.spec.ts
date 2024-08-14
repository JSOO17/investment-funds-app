import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFundListComponent } from './investment-fund-list.component';

describe('InvestmentFundListComponent', () => {
  let component: InvestmentFundListComponent;
  let fixture: ComponentFixture<InvestmentFundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentFundListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentFundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
