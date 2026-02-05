import { TestBed } from '@angular/core/testing';

import { ModemsService } from './modems-service';

describe('ModemsService', () => {
  let service: ModemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
