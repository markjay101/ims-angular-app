import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetPlans } from './internet-plans';

describe('InternetPlans', () => {
  let component: InternetPlans;
  let fixture: ComponentFixture<InternetPlans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetPlans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetPlans);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
