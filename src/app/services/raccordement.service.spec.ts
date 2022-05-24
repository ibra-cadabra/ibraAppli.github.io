import {TestBed} from '@angular/core/testing';

import {RaccordementService} from './raccordement.service';

describe('RaccordementService', () => {
  let service: RaccordementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaccordementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
