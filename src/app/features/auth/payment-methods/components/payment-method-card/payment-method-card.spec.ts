import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodCard } from './payment-method-card';

describe('PaymentMethodCard', () => {
  let component: PaymentMethodCard;
  let fixture: ComponentFixture<PaymentMethodCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
