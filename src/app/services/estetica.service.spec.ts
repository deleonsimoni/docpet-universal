import { TestBed } from '@angular/core/testing';

import { EsteticaService } from './estetica.service';

describe('EsteticaService', () => {
  let service: EsteticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsteticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
