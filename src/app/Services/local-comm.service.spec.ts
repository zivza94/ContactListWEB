import { TestBed } from '@angular/core/testing';

import { LocalCommService } from './local-comm.service';

describe('LocalCommService', () => {
  let service: LocalCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
