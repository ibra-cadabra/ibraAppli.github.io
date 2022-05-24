import {TestBed} from '@angular/core/testing';

import {ReconnexionService} from './reconnexion.service';

describe('ReconnexionService', () => {
  let service: ReconnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReconnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
