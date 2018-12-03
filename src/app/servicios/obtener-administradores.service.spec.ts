import { TestBed } from '@angular/core/testing';

import { ObtenerAdministradoresService } from './obtener-administradores.service';

describe('ObtenerAdministradoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerAdministradoresService = TestBed.get(ObtenerAdministradoresService);
    expect(service).toBeTruthy();
  });
});
