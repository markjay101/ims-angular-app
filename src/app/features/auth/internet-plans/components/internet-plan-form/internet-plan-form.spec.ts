import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetPlanForm } from './internet-plan-form';

describe('InternetPlanForm', () => {
  let component: InternetPlanForm;
  let fixture: ComponentFixture<InternetPlanForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetPlanForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetPlanForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
