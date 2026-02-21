import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsGuide } from './steps-guide';

describe('StepsGuide', () => {
  let component: StepsGuide;
  let fixture: ComponentFixture<StepsGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsGuide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
