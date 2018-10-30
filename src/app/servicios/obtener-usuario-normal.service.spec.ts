import { TestBed } from '@angular/core/testing';

import { ObtenerUsuarioNormalService } from './obtener-usuario-normal.service';

describe('ObtenerUsuarioNormalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerUsuarioNormalService = TestBed.get(ObtenerUsuarioNormalService);
    expect(service).toBeTruthy();
  });
});
