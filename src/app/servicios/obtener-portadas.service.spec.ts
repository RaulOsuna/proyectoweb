import { TestBed } from '@angular/core/testing';

import { ObtenerPortadasService } from './obtener-portadas.service';

describe('ObtenerPortadasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerPortadasService = TestBed.get(ObtenerPortadasService);
    expect(service).toBeTruthy();
  });
});
