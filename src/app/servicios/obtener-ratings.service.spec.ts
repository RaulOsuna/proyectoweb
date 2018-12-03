import { TestBed } from '@angular/core/testing';

import { ObtenerRatingsService } from './obtener-ratings.service';

describe('ObtenerRatingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerRatingsService = TestBed.get(ObtenerRatingsService);
    expect(service).toBeTruthy();
  });
});
