import { TestBed } from '@angular/core/testing';

import { ObtenerMusicoService } from './obtener-musico.service';

describe('ObtenerMusicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerMusicoService = TestBed.get(ObtenerMusicoService);
    expect(service).toBeTruthy();
  });
});
