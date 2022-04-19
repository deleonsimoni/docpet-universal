import { TestBed } from '@angular/core/testing';

import { AdestradorService } from './adestrador.service';

describe('AdestradorService', () => {
  let service: AdestradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdestradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
