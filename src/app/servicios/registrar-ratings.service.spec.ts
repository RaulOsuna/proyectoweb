import { TestBed } from '@angular/core/testing';

import { RegistrarRatingsService } from './registrar-ratings.service';

describe('RegistrarRatingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarRatingsService = TestBed.get(RegistrarRatingsService);
    expect(service).toBeTruthy();
  });
});
