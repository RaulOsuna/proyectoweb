import { TestBed } from '@angular/core/testing';

import { RegistrarCompartidosService } from './registrar-compartidos.service';

describe('RegistrarCompartidosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrarCompartidosService = TestBed.get(RegistrarCompartidosService);
    expect(service).toBeTruthy();
  });
});
