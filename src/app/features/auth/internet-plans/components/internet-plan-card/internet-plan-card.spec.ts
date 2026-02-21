import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetPlanCard } from './internet-plan-card';

describe('InternetPlanCard', () => {
  let component: InternetPlanCard;
  let fixture: ComponentFixture<InternetPlanCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetPlanCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetPlanCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
