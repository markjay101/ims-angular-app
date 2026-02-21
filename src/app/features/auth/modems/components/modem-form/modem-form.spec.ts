import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModemForm } from './modem-form';

describe('ModemForm', () => {
  let component: ModemForm;
  let fixture: ComponentFixture<ModemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModemForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModemForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
