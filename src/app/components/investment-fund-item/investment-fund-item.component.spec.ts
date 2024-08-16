import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFundItemComponent } from './investment-fund-item.component';

describe('InvestmentFundItemComponent', () => {
  let component: InvestmentFundItemComponent;
  let fixture: ComponentFixture<InvestmentFundItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentFundItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentFundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
