import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { InvestorGlobalContextService, InvestorResponse } from './services/investor-global-context-service/investor-global-context.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let investorGlobalContextService: InvestorGlobalContextService;

  const mockInvestorResponse: InvestorResponse = {
    amount: 1000
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: InvestorGlobalContextService,
          useValue: {
            refreshContext: () => {},
            context$: of(mockInvestorResponse),
            getCurrentContext: () => mockInvestorResponse
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    investorGlobalContextService = TestBed.inject(InvestorGlobalContextService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize investor amount from the context service', () => {
    expect(component.investor).toEqual(mockInvestorResponse);
  });

  it('should call refreshContext on ngOnInit', () => {
    spyOn(investorGlobalContextService, 'refreshContext').and.callThrough();

    component.ngOnInit();

    expect(investorGlobalContextService.refreshContext).toHaveBeenCalled();
  });

  it('should update investor amount on context change', () => {
    const newInvestorResponse: InvestorResponse = { amount: 2000 };
    (investorGlobalContextService.context$ as any).next(newInvestorResponse);
    fixture.detectChanges();

    const amountElement = fixture.nativeElement.querySelector('div div');
    expect(amountElement.textContent).toContain('$2,000');
  });

  it('should display the navigation links', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('.navbar-nav .nav-link');
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].textContent).toContain('Subscription List');
    expect(navLinks[1].textContent).toContain('Investment Funds');
    expect(navLinks[2].textContent).toContain('Transactions');
  });
});
