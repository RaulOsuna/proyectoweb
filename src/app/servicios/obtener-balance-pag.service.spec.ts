import { TestBed } from '@angular/core/testing';

import { ObtenerBalancePagService } from './obtener-balance-pag.service';

describe('ObtenerBalancePagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerBalancePagService = TestBed.get(ObtenerBalancePagService);
    expect(service).toBeTruthy();
  });
});
