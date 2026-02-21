import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modems } from './modems';

describe('Modems', () => {
  let component: Modems;
  let fixture: ComponentFixture<Modems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
