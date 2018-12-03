import { TestBed } from '@angular/core/testing';

import { ObtenerCompartidosService } from './obtener-compartidos.service';

describe('ObtenerCompartidosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerCompartidosService = TestBed.get(ObtenerCompartidosService);
    expect(service).toBeTruthy();
  });
});
